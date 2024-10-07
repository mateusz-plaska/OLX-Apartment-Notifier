import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_preferences'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('name')
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('name')
    })
  }
}