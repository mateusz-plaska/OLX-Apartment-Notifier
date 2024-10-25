import Region from '#models/region';
import { BaseSeeder } from '@adonisjs/lucid/seeders'

interface IRegion {
  id: number;
  name: string;
  normalized_name: string;
}

interface ApiResponse {
  data: IRegion[]
}

export default class extends BaseSeeder {
  async run() {
    await this.fetchData()
  }

  async fetchData() {
    const response = await fetch('https://www.olx.pl/api/v1/geo-encoder/regions')

    if(!response.ok) {
      return
    }

    const jsonResponse = (await response.json()) as ApiResponse

    jsonResponse.data.forEach(async (region) => {
      await Region.create(region)
    })
  }
}