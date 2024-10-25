import type { HttpContext } from '@adonisjs/core/http'
import UserPreference from "#models/user_preference";
import City from '#models/city';
import District from '#models/district';

export default class LocationsController {
    async getSelectedBuildingTypesInPreference({params, response}: HttpContext) {
        const userPreference = await UserPreference.findOrFail(params.userPreferenceId)
        const selectedBuildingTypes = await userPreference.related('buildingTypes').query()
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
}