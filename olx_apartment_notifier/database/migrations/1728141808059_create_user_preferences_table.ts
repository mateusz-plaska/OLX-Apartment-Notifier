import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_preferences'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.boolean('is_active')

      table.json('title_keywords')    
      table.json('description_keywords')
      table.json('rooms')
      table.json('square')
      table.json('price')
      table.json('floor')
      table.boolean('furnished')

      table.integer('building_type_id').unsigned().references('building_types.id').onDelete('SET NULL') 

      table.boolean('pets_allowed')
      table.boolean('lift')
      table.boolean('car_park')

      table.json('rent_price')
      table.json('price_for_m2')
      table.integer('type')              // 14 - sell, 15 - rent 

      table.integer('region_id').unsigned().references('regions.id').onDelete('SET NULL')
      table.integer('city_id').unsigned().references('cities.id').onDelete('SET NULL')
      table.integer('district_id').unsigned().references('districts.id').onDelete('SET NULL')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}