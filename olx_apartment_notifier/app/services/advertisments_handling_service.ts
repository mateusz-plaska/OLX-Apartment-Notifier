import NotificationStory from "#models/notification_story"
import UserPreference from "#models/user_preference"
import { inject } from "@adonisjs/core"
import AdvertismentPreferenceComparingService from "./advertisment_preference_comparing_service.js"

export interface Advertisment {
    id: number,
    title: string,
    description: string,
    url: string,
    params: { key: string, name: string, value: {key: string, label: string, value: number, currency: string} }[],  // rooms, square, price, floor, furnished, carPark, lift, pets, buildType, rentPrice, price_for_m2
    location: Location,
    category: { id: number } 
}

interface Location {
    region: { id: number },
    city: { id: number },
    district: { id: number }
}

interface ApiResponse {
    data: Advertisment[],
    links: { next: { href: string } }
}


export default class AdvertismentsHandlingService {
    @inject()
    async handleAdvertisments(advertismentPreferenceComparingService: AdvertismentPreferenceComparingService) {


        // aktualizacja sent_date

        let i = 0
        while(true) {
            const urlLink = `https://www.olx.pl/api/v1/offers/?offset=${i}&category_id=1307`
            i++

            const response = await fetch(urlLink)
            if(!response.ok) {
                return
            }

            const jsonResponse = (await response.json()) as ApiResponse

            const userPreferences = await UserPreference.findManyBy('isActive', true)

            for(const preference of userPreferences) {
                const fittedAdvertismentsToSend: Advertisment[] = []
                for(const advertisment of jsonResponse.data) {
                    const notification = await NotificationStory.query().where('advertisment_id', advertisment.id).where('user_preference_id', preference.id).first()
                    
                    if(!notification) {
                        if(await advertismentPreferenceComparingService.isAdvertismentFitsUserPreference(advertisment, preference)) {
                            fittedAdvertismentsToSend.push(advertisment)
                        }
                    }
                }

                // skonfigurowac maila z:   preference + fittedAdvertismentsToSend i wyslac
                // aktualizacja bazy powiadomien - dodać elementy z preference + fittedAdvertisment
            }
        } 
    }
}