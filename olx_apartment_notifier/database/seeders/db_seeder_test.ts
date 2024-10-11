import Advertisment from '#models/advertisment'
import BuildingType from '#models/building_type'
import City from '#models/city'
import District from '#models/district'
import NotificationStory from '#models/notification_story'
import Region from '#models/region'
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
      id: 1, 
      fullName: 'Mate',
      email: 'plaskamateuszi8@gmail.com',
      password: '123123123'
    })

    await User.create({
      id: 2,
      fullName: 'jaifj',
      email: '1@gmail.com',
      password: '123123123'
    })

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

    await BuildingType.create({
      id: 1,
      name: 'dom'
    })

    await BuildingType.create({
      id: 2,
      name: 'blok'
    })

    await BuildingType.create({
      id: 3,
      name: 'kamienica'
    })

    await BuildingType.create({
      id: 4,
      name: 'apartamentowiec'
    })

    await Region.create({
      id: 1,
      normalizedName: 'dolonslaskie',
      name:'dolnośląskie'
    })

    await City.create({
      id: 12849,
      regionId: 1,
      name: 'Wrocław',
      normalizedName: 'Wroclaw'
    })

    await District.create({
      id: 4,
      cityId: 12849,
      name: 'Śródmieście'
    })
  }

  async test2() {
    await UserPreference.create({
      id: 1,
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

    await Advertisment.create({
      id: 1,
      title: 'fjaksjfk',
      description: 'ajkfjaskfjakf',
      urlLink: '12894',
      buildingTypeId: 1,
      rentPrice: 140.24,
      type: 14,
      regionId: 1,
      cityId: 12849,
      districtId: 4
    })
  }

  async test3() {
    await NotificationStory.create({
      id: 1,
      userPreferenceId: 1,
      advertismentId: 1,
      sentDate: DateTime.now()
    })
  }

  async test4() {
    const userPreference1 = await UserPreference.findOrFail(15)
    await userPreference1.related('buildingTypes').attach([13, 14, 12])

    const userPreference2 = await UserPreference.findOrFail(16)
    await userPreference2.related('buildingTypes').attach([12,13,14,15,16,17,18])
  }
}