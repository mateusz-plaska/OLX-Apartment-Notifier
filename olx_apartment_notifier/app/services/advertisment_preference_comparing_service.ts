import BuildingType from "#models/building_type"
import UserPreference from "#models/user_preference"
import { Advertisment } from "./advertisments_handling_service.js"

export default class AdvertismentPreferenceComparingService {
    private includesAnyKeywords(text: string, keywordsSeparatedByComma: string): boolean {
        const normalizedText = text.toLowerCase()
        return keywordsSeparatedByComma.toLowerCase().split(',').some(keyword => normalizedText.includes(keyword))
    }

    private findParam(advertisment: Advertisment, key: string) {
        return advertisment.params.find(param => param.key === key)
    }

    private isInRange(value: number, range: string): boolean {
        const [min, max] = range.split(';').map(Number)
        return value >= min && value <= max
    }

    private isEqual<T>(advertValue: T | undefined, preferenceValue: T) {
        return advertValue ? advertValue === preferenceValue : false
    }

    async isAdvertismentFitsUserPreference(advertisment: Advertisment, preference: UserPreference): Promise<boolean> {        
        if(!advertisment.url) {
            return false
        }

        if(!this.includesAnyKeywords(advertisment.title || '', preference.titleKeywords || '')) {
            return false
        }

        if(!this.includesAnyKeywords(advertisment.description || '', preference.descriptionKeywords || '')) {
            return false
        }

        if(preference.regionId && !this.isEqual(advertisment.location?.region?.id, preference.regionId)) {
            return false
        }

        if(preference.cityId && !this.isEqual(advertisment.location?.city?.id, preference.cityId)) {
            return false
        }

        if(preference.districtId && !this.isEqual(advertisment.location?.district?.id, preference.districtId)) {
            return false
        }
        
        if(preference.type !== 0 && !this.isEqual(advertisment.category?.id, preference.type)) {
            return false
        }

        if(preference.rooms) {
            const roomAdvParam = this.findParam(advertisment, 'rooms')
            const roomMap = { 'one': '1', 'two': '2', 'three': '3', 'four': '4' }
            const roomAdvertisment = roomMap[roomAdvParam?.value.key as keyof typeof roomMap]
            if(!preference.rooms.split(',').includes(roomAdvertisment)) {
                return false
            }
        }

        if(preference.square !== ';') {
            const squareAdvParam = this.findParam(advertisment, 'm')
            if(!squareAdvParam || !this.isInRange(parseFloat(squareAdvParam.value.key), preference.square)) {
                return false
            }
        }

        if(preference.price !== ';') {
            const priceAdvParam = this.findParam(advertisment, 'price')
            if(!priceAdvParam || priceAdvParam.value.currency !== 'PLN' || 
                        !this.isInRange(priceAdvParam.value.value, preference.price)) {
                return false
            }
        }
    
        if(preference.floor) {
            const floorAdvParam = this.findParam(advertisment, 'floor_select')
            const floorAdvertisment = floorAdvParam?.value.key.split('_')[1]
            if(!floorAdvertisment || !preference.floor.split(',').includes(floorAdvertisment)) {
                return false
            }
        }

        // boolean in db as 0/1, !! - converts to boolean
        const isFurnishedAdv = this.findParam(advertisment, 'furniture')?.value.key === 'yes' || false
        if(!!preference.furnished !== isFurnishedAdv) {
            return false
        }

        const isPetsAllowedAdv = this.findParam(advertisment, 'pets')?.value.key === 'Tak' || false
        if(!!preference.petsAllowed !== isPetsAllowedAdv) {
            return false
        }
            
        const isLiftAdv = this.findParam(advertisment, 'winda')?.value.key === 'Tak' || false
        if(!!preference.lift !== isLiftAdv) {
            return false
        }

        const parkingAdvParam = this.findParam(advertisment, 'parking')
        const isParkingAdv = parkingAdvParam?.value.label !== undefined && parkingAdvParam.value.label !== 'brak' 
        if(!!preference.carPark !== isParkingAdv) {
            return false
        }

    
        const builtTypeAdvParam = this.findParam(advertisment, 'builttype')
        if(!builtTypeAdvParam) {
            return false
        } 

        const builtTypeAdvertisment = await BuildingType.findByOrFail('name', builtTypeAdvParam.value.label)
        const buildTypesPreference = (await preference.related('buildingTypes').query()).map(builtType => builtType.id)
        if(!buildTypesPreference.includes(builtTypeAdvertisment.id)) {
            return false
        }

        if(preference.rentPrice !== ';') {
            const rentPriceAdvParam = this.findParam(advertisment, 'rent')
            if(!rentPriceAdvParam || !this.isInRange(parseFloat(rentPriceAdvParam.value.key), preference.rentPrice)) {
                return false
            }
        }

        if(preference.priceForM2 !== ';') {
            const priceForM2AdvParam = this.findParam(advertisment, 'price_per_m')
            if(!priceForM2AdvParam || !this.isInRange(parseFloat(priceForM2AdvParam.value.key), preference.priceForM2)) {
                return false
            }
        }

        return true
    }
}
