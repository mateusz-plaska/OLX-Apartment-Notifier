
export default class UserPreferenceDataService {
    private getStringValueConcat(firstString: string, secondString: string) {
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

    private getResendNotificationCooldownInDays(value: number, unit: string): number {
        const unitMap = { 'days': 1, 'weeks': 7, 'months': 30 }
        return value * unitMap[unit as keyof typeof unitMap]
    }
    
    getUserPreferenceDataJson(data: Record<string, any>, 
                integerValues: { rooms: string | undefined; floor: string | undefined; }  ): Partial<any> {
        
        return {
            name: data.name,
            titleKeywords:  data.title_keywords,
            descriptionKeywords: data.description_keywords,
            rooms: integerValues.rooms || null,
            square: this.getStringValueConcat(data.square_min, data.square_max),
            price: this.getStringValueConcat(data.price_min, data.price_max),
            floor: integerValues.floor || null,
            furnished: data.furnished ? true : false,                         
            petsAllowed: data.pets_allowed ? true : false,
            lift: data.lift ? true : false,
            carPark: data.car_park ? true : false,
            rentPrice:  this.getStringValueConcat(data.rent_price_min, data.rent_price_max),
            priceForM2:  this.getStringValueConcat(data.price_for_m2_min, data.price_for_m2_max),
            type: parseInt(data.type, 10), 
            regionId: data.region_id !== null ? parseInt(data.region_id, 10) : null,
            cityId: data.city_id !== null ? parseInt(data.city_id, 10) : null,
            districtId: data.district_id !== null ? parseInt(data.district_id, 10) : null,
            resendNotificationCooldownInDays: this.getResendNotificationCooldownInDays(
                        parseInt(data.resendNotificationCooldown.value), data.resendNotificationCooldown.unit)
        }
    }

    getBuildingTypeIds(data: Record<string, any>): string[] | null {
        if(!data.building_type_ids) {
            return null
        }

        let buildingTypeIds: string[] = data.building_type_ids
        if(!Array.isArray(data.building_type_ids)) {
            buildingTypeIds = [data.building_type_ids]
        }

        return buildingTypeIds
    }
}