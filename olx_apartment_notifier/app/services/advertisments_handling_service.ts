import NotificationStory from "#models/notification_story"
import UserPreference from "#models/user_preference"
import { inject } from "@adonisjs/core"
import AdvertismentPreferenceComparingService from "./advertisment_preference_comparing_service.js"
import EmailSendingService from "./email_sending_service.js"
import { DateTime } from "luxon"

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
    data: Advertisment[]
}


export default class AdvertismentsHandlingService {
    async addNotificationsToDatabse(preference: UserPreference, advertisments: Advertisment[]) {
        for(const advertisment of advertisments) {
            await NotificationStory.create({
                userPreferenceId: preference.id,
                advertismentId: advertisment.id,
                sentDate: DateTime.now()
            })
        }
    }

    async checkCooldownAndUpdateNotifications() {
        const notifications = await NotificationStory.all()

        for(const notification of notifications) {
            const resendNotificationCooldownInDays = (await UserPreference.findOrFail(notification.userPreferenceId)).resendNotificationCooldownInDays
            
            if(notification.sentDate.plus({ days: resendNotificationCooldownInDays }) <= DateTime.now()) {
                await notification.delete()
            }
        }
    }

    async fetchAdvertisments() {
        const advertisments: Advertisment[] = []

        for (let i = 0; ; i++) {
            const urlLink = `https://www.olx.pl/api/v1/offers/?offset=${i}&category_id=1307`
            
            const response = await fetch(urlLink)
            if(!response.ok) {
                return advertisments
            }

            const jsonResponse = (await response.json()) as ApiResponse
            advertisments.push(...jsonResponse.data)
        }
    }

    @inject()
    async handleAdvertisments(advertismentPreferenceComparingService: AdvertismentPreferenceComparingService, 
                                emailSendingService: EmailSendingService) {

        await this.checkCooldownAndUpdateNotifications()

        const advertisments: Advertisment[] = await this.fetchAdvertisments()
        const userPreferences = await UserPreference.findManyBy('isActive', true)
    
        for(const preference of userPreferences) {
            const fittedAdvertismentsToSend: Advertisment[] = []
            for(const advertisment of advertisments) {
                const notification = await NotificationStory.query().where('advertisment_id', advertisment.id).where('user_preference_id', preference.id).first()
                
                if(!notification) {
                    if(await advertismentPreferenceComparingService.isAdvertismentFitsUserPreference(advertisment, preference)) {
                        fittedAdvertismentsToSend.push(advertisment)
                    }
                }
            }

            if(fittedAdvertismentsToSend.length) {
                await emailSendingService.sendEmailWithPreferenceAndAdvertisments(preference, fittedAdvertismentsToSend)
                await this.addNotificationsToDatabse(preference, fittedAdvertismentsToSend)
            }
        } 
    }
}