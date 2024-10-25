import NotificationStory from '#models/notification_story'
import User from '#models/user'
import UserPreference from '#models/user_preference'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // await this.test1()
    // await this.test2()
    // await this.test3()
    // await this.test4()
  }

  async test1() {
    await User.create({
      fullName: 'Mate',
      email: 'plaskamateuszi8@gmail.com',
      password: '123123123'
    })

    await User.create({
      fullName: 'jaifj',
      email: '1@gmail.com',
      password: '123123123'
    })
  }

  async test2() {
    await UserPreference.create({
      userId: 2,
      name: 'bdfbd 2',
      isActive: false,

      titleKeywords: 'd, gad',
      descriptionKeywords: 'asv, sgt',
      rooms: '2,4',
      square: '15;29',
      price: '821.4;1891.1',
      floor: '1,2,3,4',
      furnished: true,
      petsAllowed: true,
      lift: true,
      carPark: false,
      rentPrice: '300.45;2590.5',
      priceForM2: '1000;9320.54',
      regionId: 3,
      cityId: 19701,
      districtId: 387
    })

    await UserPreference.create({
      userId: 2,
      name: 'Abchbhd',
      isActive: false,

      titleKeywords: 'skj',
      descriptionKeywords: 'jkjsfd',
      rooms: '1,2',
      square: '15;29',
      price: '1000;1891.1',
      floor: '1,2,9,4',
      furnished: true,
      petsAllowed: false,
      lift: true,
      type: 15,
      regionId: 3,
      cityId: 19701,
      districtId: 387
    })

    await UserPreference.create({
      userId: 2,
      name: 'Preff nazwa 8',
      isActive: true,

      titleKeywords: 'advdsv',
      descriptionKeywords: 'gsdgsd,dfdbdsffbdsbfbs',
      rooms: '3,4',
      square: '25;49',
      price: '1000;2350.5',
      floor: '2,3,4',
      furnished: true,
      petsAllowed: false,
      lift: true,
      type: 15,
      regionId: 3,
      cityId: 19701,
      districtId: 387
    })

    await UserPreference.create({
      userId: 2,
      name: 'Nazwa 2',
      isActive: true,

      titleKeywords: 'hgdfjsn',
      descriptionKeywords: 'kynsth,dfdbdsffbdsbfbs',
      rooms: '3,4,7',
      square: '25;49',
      price: '1000;2350.5',
      floor: '2,3,4',
      furnished: true,
      petsAllowed: false,
      lift: true,
      type: 15,
      regionId: 3,
      cityId: 19701,
      districtId: 387
    })

    await UserPreference.create({
      userId: 1,
      name: 'Nazwa 1',
      isActive: true,

      titleKeywords: 'jyndfg',
      descriptionKeywords: 'kufm,nnytsd',
      rooms: '2,4,7',
      square: '25;49',
      price: '1000;2350.5',
      floor: '2,3,4',
      furnished: true,
      petsAllowed: false,
      lift: true,
      type: 15,
      regionId: 3,
      cityId: 19701,
      districtId: 387
    })
  }

  async test3() {
    await NotificationStory.create({
      userPreferenceId: 2,
      advertismentId: 1,
      sentDate: DateTime.now()
    })
  }

  async test4() {
    const userPreference1 = await UserPreference.findOrFail(2)
    await userPreference1.related('buildingTypes').attach([1,2,3])

    const userPreference2 = await UserPreference.findOrFail(3)
    await userPreference2.related('buildingTypes').attach([1,2,3,4,5,6,7])
  }
}