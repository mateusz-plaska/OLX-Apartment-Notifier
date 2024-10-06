import City from '#models/city'
import District from '#models/district'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

interface IDistrict {
  id: number,
  city_id: number,
  name: string,
}

interface ApiResponse {
  data: IDistrict[]
}

export default class extends BaseSeeder {
  async run() {
    //await this.fetchDistrictData()
  }

  async fetchDistrictData() {
    const cityIds = (await City.query()).map(city => city.id)

    for(const cityId of cityIds) {
      const urlLink = `https://www.olx.pl/api/v1/geo-encoder/cities/${cityId}/districts`
      const response = await fetch(urlLink)
      
      if(!response.ok) {
        continue
      }

      const jsonResponse = (await response.json()) as ApiResponse

      for(const district of jsonResponse.data) {
        await District.create({
          id: district.id,
          cityId: district.city_id,
          name: district.name
        })
      }
    }
  }
}