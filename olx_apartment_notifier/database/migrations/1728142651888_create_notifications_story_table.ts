import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notification_stories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_preference_id').unsigned().references('user_preferences.id').onDelete('CASCADE')
      table.integer('advertisment_id').unsigned().references('advertisments.id').onDelete('CASCADE')
      table.dateTime('sent_date')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}