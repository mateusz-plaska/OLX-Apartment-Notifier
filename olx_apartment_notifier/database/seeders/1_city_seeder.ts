import City from '#models/city'
import Region from '#models/region'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

interface ICity {
  id: number,
  name: string,
  normalized_name: string,
  county: string
}

interface ApiResponse {
  data: ICity[]
}

export default class extends BaseSeeder {
  async run() {
    //await this.fetchCityData()
  }

  async fetchCityData() {
    const regionIds = (await Region.query()).map(region => region.id)

    for (const regionId of regionIds) {
      const urlLink = `https://www.olx.pl/api/v1/geo-encoder/regions/${regionId}/cities/?limit=300`
      const response = await fetch(urlLink)

      if(!response.ok) {
        return
      }

      const jsonResponse = (await response.json()) as ApiResponse

      for (const city of jsonResponse.data) {
        await City.create({
          id: city.id,
          regionId: regionId,
          name: city.name,
          normalizedName: city.normalized_name,
          county: city.county
        }) 
      }
    }
  }
}