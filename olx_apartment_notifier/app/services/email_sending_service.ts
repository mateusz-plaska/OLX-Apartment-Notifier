import City from "#models/city";
import District from "#models/district";
import Region from "#models/region";
import User from "#models/user";
import UserPreference from "#models/user_preference";
import mail from "@adonisjs/mail/services/main";
import { Advertisment } from "./advertisments_handling_service.js";

export default class EmailSendingService {
    private async getLocationString(regionId: number | undefined | null, cityId: number | undefined | null, 
                                    districtId: number | undefined | null): Promise<string> {
        const location = []
        if(regionId) {
            location.push((await Region.query().where('id', regionId).first())?.name)
        }
        if(cityId) {
            location.push((await City.query().where('id', cityId).first())?.name)
        }
        if(districtId) {
            location.push((await District.query().where('id', districtId).first())?.name)
        }
        return location.filter(Boolean).join(', ')
    }

    private getCategoryTypeString(typeId: number | undefined) {
        const typeMap = { 14: 'Sprzedaż', 15: 'Wynajem', 0: 'Sprzedaż i Wynajem' }
        return typeId ? typeMap[typeId as keyof typeof typeMap] : ''
    }

    private getSemicolnSeparatedValuesAsDecoratedString(stringValue: string, postFix: string) {
        return stringValue.split(';').map(value => value === '' ? value = 'brak' : value = value.concat(postFix)).join(' - ')
    }

    private async getDataToEmail(preference: UserPreference, adverts: Advertisment[]) {
        const userPreference = {
            id: preference.id,
            userId: preference.userId,
            name: preference.name || '',
            location: await this.getLocationString(preference.regionId, preference.cityId, preference.districtId),
            categoryType: this.getCategoryTypeString(preference.type),
            price: this.getSemicolnSeparatedValuesAsDecoratedString(preference.price, 'zł'),
            titleKeywords: preference.titleKeywords || '',
            descriptionKeywords: preference.descriptionKeywords || '',
            buildingTypes: (await preference.related('buildingTypes').query()).map(builtType => builtType.name).join(', '),
            rooms: preference.rooms || '',
            floor: preference.floor || '',
            square: this.getSemicolnSeparatedValuesAsDecoratedString(preference.square, 'm²'),
            furnished: preference.furnished ? 'Tak' : 'Nie',
            petsAllowed: preference.petsAllowed ? 'Tak' : 'Nie',
            lift: preference.lift ? 'Tak' : 'Nie',
            carPark: preference.carPark ? 'Tak' : 'Nie',
            rent: this.getSemicolnSeparatedValuesAsDecoratedString(preference.rentPrice, 'zł'),
            priceForM2: this.getSemicolnSeparatedValuesAsDecoratedString(preference.priceForM2, 'zł')
        }

        const advertisments = await Promise.all(adverts.map(async (advertisment) => ({
                title: advertisment.title || '',
                location: await this.getLocationString(advertisment.location?.region?.id, advertisment.location?.city?.id, 
                                                        advertisment.location?.district?.id),
                categoryType: this.getCategoryTypeString(advertisment.category?.id),
                price: advertisment.params.find(param => param.key === 'price')?.value.value.toString().concat('zł') || 'brak',
                urlLink: advertisment.url
            }))
        )

        return {userPreference, advertisments}
    }

    async sendEmailWithPreferenceAndAdvertisments(preference: UserPreference, adverts: Advertisment[]) {
        const {userPreference, advertisments} = await this.getDataToEmail(preference, adverts)

        const email = (await User.findOrFail(userPreference.userId)).email

        await mail.send((message) => {
            message
                .from('app.notifier.1@gmail.com', 'OLX Apartment Notifier')
                .to('plaskamateuszi8@gmail.com') // email
                .subject(`Oferty dla preferencji: ${userPreference.name}`)
                .htmlView('emails/email_view', {userPreference, advertisments})
        })
    }
}