import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import UserPreference from './user_preference.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

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

  @hasMany(() => UserPreference)
  declare user_preferences: HasMany<typeof UserPreference>
}