import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_preferences'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('price_for_m2', 'price_for_m_2')
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.renameColumn('price_for_m_2', 'price_for_m2')
    })
  }
}