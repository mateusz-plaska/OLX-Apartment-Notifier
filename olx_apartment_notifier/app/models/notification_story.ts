import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import UserPreference from './user_preference.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class NotificationStory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userPreferenceId: number

  @column()
  declare advertismentId: number

  @column.dateTime({
    serialize: (value) => value.toFormat('yyyy-LL-dd HH:mm:ss')
  })
  declare sentDate: DateTime

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


  @belongsTo(() => UserPreference)
  declare userPreference: BelongsTo<typeof UserPreference>
}