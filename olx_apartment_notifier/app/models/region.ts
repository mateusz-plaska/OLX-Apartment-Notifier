import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import City from './city.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Advertisment from './advertisment.js'
import UserPreference from './user_preference.js'

export default class Region extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare normalizedName: string

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

  @hasMany(() => City)
  declare cities: HasMany<typeof City>

  @hasMany(() => UserPreference)
  declare userPreference: HasMany<typeof UserPreference>

  @hasMany(() => Advertisment)
  declare advertisment: HasMany<typeof Advertisment>
}