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
    await this.test1()
    await this.test2()
    await this.test3()
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


    await BuildingType.create({
      id: 1,
      name: 'dom'
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
      isActive: false,

      titleKeywords: {value: 'skj'},
      descriptionKeywords: {value: 'jkjsfd'},
      rooms: {value: [1,2]},
      square: {min: 15, max: 29},
      price: {min: 1000, max: 1891.1},
      floor: {values: [1,2,9,4]},
      furnished: true,
      buildingTypeId: 1,
      petsAllowed: false,
      lift: true,
      type: 15,
      regionId: 1,
      cityId: 12849,
      districtId: 4
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
}