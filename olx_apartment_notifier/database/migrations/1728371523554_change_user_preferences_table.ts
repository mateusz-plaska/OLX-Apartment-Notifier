import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_preferences'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('title_keywords').alter()    
      table.string('description_keywords').alter()
      table.string('rooms').alter()
      table.string('square').alter()
      table.string('price').alter()
      table.string('floor').alter()
      table.string('rent_price').alter()
      table.string('price_for_m_2').alter()
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.json('title_keywords').alter() 
      table.json('description_keywords').alter()
      table.json('rooms').alter()
      table.json('square').alter()
      table.json('price').alter()
      table.json('floor').alter()
      table.json('rent_price').alter()
      table.json('price_for_m_2').alter()
    })
  }
}