import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'regions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.text('name')
      table.text('normalized_name')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}