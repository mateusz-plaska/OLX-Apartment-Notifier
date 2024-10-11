import BuildingType from '#models/building_type'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // await this.seedBuildingTypesTable()
  }

  async seedBuildingTypesTable() {
    const buildingTypeNames = ['Blok', 'Kamienica', 'Dom wolnostojący', 'Szeregowiec', 'Apartamentowiec', 'Loft', 'Pozostałe']
  
    for(const buildingTypeName of buildingTypeNames) {
      await BuildingType.create({
        name: buildingTypeName
      })
    }
  }
}