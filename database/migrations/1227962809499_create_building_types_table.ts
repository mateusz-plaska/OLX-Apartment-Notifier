import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'building_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.text('name')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}