import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import BuildingType from './building_type.js'
import District from './district.js'
import City from './city.js'
import Region from './region.js'
import NotificationStory from './notification_story.js'

export default class UserPreference extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare isActive: boolean

  @column()
  declare titleKeywords: string
  
  @column()
  declare descriptionKeywords: string

  @column()
  declare rooms: string

  @column()
  declare square: string

  @column()
  declare price: string

  @column()
  declare floor: string

  @column()
  declare furnished: boolean

  @column()
  declare petsAllowed: boolean

  @column()
  declare lift: boolean

  @column()
  declare carPark: boolean
  
  @column()
  declare rentPrice: string

  @column()
  declare priceForM2: string

  @column()
  declare type: number

  @column()
  declare regionId: number | null

  @column()
  declare cityId: number | null

  @column()
  declare districtId: number | null

  @column()
  declare resendNotificationCooldownInDays: number

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

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Region)
  declare region: BelongsTo<typeof Region>

  @belongsTo(() => City)
  declare city: BelongsTo<typeof City>

  @belongsTo(() => District)
  declare district: BelongsTo<typeof District>

  @hasMany(() => NotificationStory)
  declare notificationStory: HasMany<typeof NotificationStory>

  @manyToMany(() => BuildingType, {
    pivotTable: 'building_type_user_preference',
  })
  declare buildingTypes: ManyToMany<typeof BuildingType>
}