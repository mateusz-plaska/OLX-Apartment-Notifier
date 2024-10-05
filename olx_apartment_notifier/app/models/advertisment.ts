import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import BuildingType from './building_type.js'
import City from './city.js'
import District from './district.js'
import Region from './region.js'
import NotificationStory from './notification_story.js'

export default class Advertisment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string
  
  @column()
  declare description: string

  @column()
  declare urlLink: string

  @column()
  declare rooms: number

  @column()
  declare square: number

  @column()
  declare price: number

  @column()
  declare floor: number

  @column()
  declare furnished: boolean

  @column()
  declare buildingTypeId: number

  @column()
  declare petsAllowed: boolean

  @column()
  declare lift: boolean

  @column()
  declare carPark: boolean
  
  @column()
  declare rentPrice: number

  @column()
  declare priceForM2: number

  @column()
  declare type: number

  @column()
  declare regionId: number

  @column()
  declare cityId: number

  @column()
  declare districtId: number

  @column.dateTime({ 
    autoCreate: true,
    serialize: (value) => value.toFormat('yyyy-LL-dd HH:mm:ss') 
  })
  declare createdAt: DateTime

  @column.dateTime({ 
    autoCreate: true, 
    autoUpdate: true,
    serialize: (value) => value.toFormat('yyyy-LL-dd HH:mm:ss') 
  })
  declare updatedAt: DateTime


  @belongsTo(() => BuildingType)
  declare buildingType: BelongsTo<typeof BuildingType>

  @belongsTo(() => Region)
  declare region: BelongsTo<typeof Region>

  @belongsTo(() => City)
  declare city: BelongsTo<typeof City>

  @belongsTo(() => District)
  declare district: BelongsTo<typeof District>

  @hasMany(() => NotificationStory)
  declare notificationStory: HasMany<typeof NotificationStory>
}