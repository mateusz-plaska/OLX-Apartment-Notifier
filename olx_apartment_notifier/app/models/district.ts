import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import City from './city.js'
import Advertisment from './advertisment.js'
import UserPreference from './user_preference.js'

export default class District extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cityId: number

  @column()
  declare name: string

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

  @belongsTo(() => City)
  declare city: BelongsTo<typeof City>

  @hasMany(() => UserPreference)
  declare userPreference: HasMany<typeof UserPreference>

  @hasMany(() => Advertisment)
  declare advertisment: HasMany<typeof Advertisment>
}