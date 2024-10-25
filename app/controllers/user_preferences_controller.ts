import BuildingType from '#models/building_type'
import Region from '#models/region'
import UserPreference from '#models/user_preference'
import UserPreferenceDataService from '#services/user_preference_data_service'
import { userPreferencesValidator } from '#validators/user_preference'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserPreferencesController {
    async getHomeViewAndUserPreferences({auth, request, view}: HttpContext) {
        const user = await auth.use().authenticate()

        const userPreferences = await UserPreference.query().where('user_id', user.id).paginate(
            request.input('page', 1),
            request.input('perPage', 5)
        )

        return view.render('app_views/home_view', {userPreferences})
    }

    async getCreatePreferenceView({view}: HttpContext) {
        const regions = await Region.query().orderBy('normalizedName')
        const buildingTypes = await BuildingType.query()
        return view.render('app_views/create_update_preference', {regions, buildingTypes})
    }

    async getUpdatePreferenceView({params, view}: HttpContext) {
        const userPreference = await UserPreference.findOrFail(params.userPreferenceId)
        const regions = await Region.query().orderBy('normalizedName')
        const buildingTypes = await BuildingType.query()
        return view.render('app_views/create_update_preference', {userPreference, regions, buildingTypes})
    }


    async destroyPreference({params, response}: HttpContext) {
        const userPreference = await UserPreference.findOrFail(params.userPreferenceId)
        await userPreference.delete()
        return response.redirect('/home')
    }

    @inject()
    async storePreference({request, auth, response, session}: HttpContext, userPreferenceDataService: UserPreferenceDataService) {
        const user = await auth.use().authenticate()
        const data = request.all()
        const integerValues = await userPreferencesValidator.validate(request.only(['rooms', 'floor']))

        const buildingTypeIds = userPreferenceDataService.getBuildingTypeIds(data)
        if(!buildingTypeIds) {
            session.flash('error', 'Not selected building types')
            return response.redirect().back()
        }

        const userPreference = await UserPreference.create({
            userId: user.id,
            ...userPreferenceDataService.getUserPreferenceDataJson(data, integerValues)
        })
        await userPreference.related('buildingTypes').attach(buildingTypeIds)
        return response.redirect('/home')
    }
    
    @inject()
    async updatePreference({params, request, response, session}: HttpContext, userPreferenceDataService: UserPreferenceDataService) {
        const userPreference = await UserPreference.findOrFail(params.userPreferenceId)
        const data = request.all()
        const integerValues = await userPreferencesValidator.validate(request.only(['rooms', 'floor']))

        const buildingTypeIds = userPreferenceDataService.getBuildingTypeIds(data)
        if(!buildingTypeIds) {
            session.flash('error', 'Not selected building types')
            return response.redirect().back()
        }

        await userPreference.merge(userPreferenceDataService.getUserPreferenceDataJson(data, integerValues)).save()
        await userPreference.related('buildingTypes').sync(buildingTypeIds)
        return response.redirect().back()
    }
}