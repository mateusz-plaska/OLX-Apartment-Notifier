import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import UserPreference from './user_preference.js'
import District from './district.js'
import Region from './region.js'

export default class City extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare regionId: number

  @column()
  declare name: string

  @column()
  declare normalizedName: string

  @column()
  declare county: string

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

  @belongsTo(() => Region)
  declare region: BelongsTo<typeof Region>

  @hasMany(() => District)
  declare districts: HasMany<typeof District>

  @hasMany(() => UserPreference)
  declare userPreference: HasMany<typeof UserPreference>
}