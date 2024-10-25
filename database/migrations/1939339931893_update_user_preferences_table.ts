import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_preferences'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('resend_notification_cooldown_in_days')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('resend_notification_cooldown_in_days')
    })
  }
}