import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import UserPreference from './user_preference.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class BuildingType extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

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

  @manyToMany(() => UserPreference, {
    pivotTable: 'building_type_user_preference'
  })
  declare buildingTypes: ManyToMany<typeof UserPreference>
}