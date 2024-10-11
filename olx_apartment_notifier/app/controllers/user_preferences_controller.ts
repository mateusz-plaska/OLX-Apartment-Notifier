import BuildingType from '#models/building_type'
import City from '#models/city'
import District from '#models/district'
import Region from '#models/region'
import UserPreference from '#models/user_preference'
import { userPreferencesValidator } from '#validators/user_preference'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserPreferencesController {
    async getHomeViewAndUserPreferences({auth, request, view}: HttpContext) {
        const user = await auth.use().authenticate()

        const userPreferences = await UserPreference.query().where('user_id', user.id).paginate(
            request.input('page', 1),
            request.input('perPage', 5)
        )

        return view.render('home_view', {userPreferences})
    }

    async getCreatePreferenceView({view}: HttpContext) {
        const regions = await Region.query().orderBy('normalizedName')
        const buildingTypes = await BuildingType.query()
        return view.render('create_update_preference', {regions, buildingTypes})
    }

    async getUpdatePreferenceView({params, view}: HttpContext) {
        const regions = await Region.query().orderBy('normalizedName')
        const userPreference = await UserPreference.findOrFail(params.userPreferenceId)
        const buildingTypes = await BuildingType.query()
        return view.render('create_update_preference', {userPreference, regions, buildingTypes})
    }


    /////

    async getSelectedBuildingTypesInPreference({params, response}: HttpContext) {
        const userPreference = await UserPreference.findOrFail(params.userPreferenceId)
        const selectedBuildingTypes = await userPreference.related('buildingTypes').query().pivotColumns(['building_type_id'])
        const selectedBuildingTypeIds = selectedBuildingTypes.map((buildingType) => (buildingType.id))
        return response.json(selectedBuildingTypeIds)
    }


    async getCitiesByRegion({params, response}: HttpContext) {
        const regionId = params.regionId;
        const cities = await City.query().where('region_id', regionId).orderBy('normalizedName');
        return response.json(cities);
    }

    async getDistrictsByCity({params, response}: HttpContext) {
        const cityId = params.cityId;
        const districts = await District.query().where('city_id', cityId).orderBy('name');
        return response.json(districts);
    }



    //////////////////////////

    getStringValueConcat(firstString: string, secondString: string) {
        let result = ''
        if (firstString) {
            result = firstString
        }
        result = result.concat(';')
        if(secondString) {
            result = result.concat(secondString)
        }
        return result
    }


    async storePreference({request, auth, response, session}: HttpContext) {
        const user = await auth.use().authenticate()
        const data = request.all()
        const integerValues = await userPreferencesValidator.validate(request.only(['rooms', 'floor']))

        const userPreference = await UserPreference.create({
            userId: user.id,
            isActive: false,
            name: data.name,
            titleKeywords:  data.title_keywords,
            descriptionKeywords: data.description_keywords,
            rooms: integerValues.rooms,
            square: this.getStringValueConcat(data.square_min, data.square_max),
            price: this.getStringValueConcat(data.price_min, data.price_max),
            floor: integerValues.floor,
            furnished: data.furnished ? true : false,                         
            petsAllowed: data.pets_allowed ? true : false,
            lift: data.lift ? true : false,
            carPark: data.car_park ? true : false,
            rentPrice:  this.getStringValueConcat(data.rent_price_min, data.rent_price_max),
            priceForM2:  this.getStringValueConcat(data.price_for_m2_min, data.price_for_m2_max),
            type: parseInt(data.type, 10), 
            regionId: data.region_id !== null ? parseInt(data.region_id, 10) : null,
            cityId: data.city_id !== null ? parseInt(data.city_id, 10) : null,
            districtId: data.district_id !== null ? parseInt(data.district_id, 10) : null
        })

        if(!data.building_type_ids) {
            session.flash('error', 'Not selected building types')
            return response.redirect().back()
        }

        let buildingTypeIds: string[] = data.building_type_ids

        if(!Array.isArray(data.building_type_ids)) {
            buildingTypeIds = [data.building_type_ids]
        }

        await userPreference.related('buildingTypes').attach(buildingTypeIds)

        return response.redirect('/home')
    }
    
    async updatePreference({params, request, response, session}: HttpContext) {
        const userPreference = await UserPreference.findOrFail(params.userPreferenceId)
        const data = request.all()

        const integerValues = await userPreferencesValidator.validate(request.only(['rooms', 'floor']))

        await userPreference.merge({
            name: data.name,
            titleKeywords:  data.title_keywords,
            descriptionKeywords: data.description_keywords,
            rooms: integerValues.rooms,
            square: this.getStringValueConcat(data.square_min, data.square_max),
            price: this.getStringValueConcat(data.price_min, data.price_max),
            floor: integerValues.floor,
            furnished: data.furnished ? true : false,                         
            petsAllowed: data.pets_allowed ? true : false,
            lift: data.lift ? true : false,
            carPark: data.car_park ? true : false,
            rentPrice:  this.getStringValueConcat(data.rent_price_min, data.rent_price_max),
            priceForM2:  this.getStringValueConcat(data.price_for_m2_min, data.price_for_m2_max),
            type: parseInt(data.type, 10), 
            regionId: data.region_id !== null ? parseInt(data.region_id, 10) : null,
            cityId: data.city_id !== null ? parseInt(data.city_id, 10) : null,
            districtId: data.district_id !== null ? parseInt(data.district_id, 10) : null
        }).save()

        if(!data.building_type_ids) {
            session.flash('error', 'Not selected building types')
            return response.redirect().back()
        }

        let buildingTypeIds: string[] = data.building_type_ids

        if(!Array.isArray(data.building_type_ids)) {
            buildingTypeIds = [data.building_type_ids]
        }

        await userPreference.related('buildingTypes').sync(buildingTypeIds)
        
        return response.redirect().back()
    }

    async destroyPreference({params, response}: HttpContext) {
        const userPreference = await UserPreference.findOrFail(params.userPreferenceId)
        await userPreference.delete()
        return response.redirect('/home')
    }
}