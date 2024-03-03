import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Indicators } from './entity/indicator.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { EconomicCategory } from '../common/define';

@Injectable()
export class IndicatorService {
  constructor(
    @InjectRepository(Indicators)
    private indicatorRepository: Repository<Indicators>,
  ) {}

  private async saveEconomicData(id: string, title: string): Promise<void> {
    const existingData = await this.indicatorRepository.findOneBy({ id });

    if (!existingData) {
      const newData = this.indicatorRepository.create({ id, title });
      console.log(newData);

      await this.indicatorRepository.save(newData);
    }
  }

  async onModuleInit() {
    const baseUrl = 'https://api.stlouisfed.org/fred/'; // baseUrl 정의
    const categoryIds = [
      EconomicCategory.Interest,
      EconomicCategory.Exchange,
      EconomicCategory.Consume,
      EconomicCategory.Production,
    ];

    try {
      for (const categoryId of categoryIds) {
        const url = `${baseUrl}category/series?category_id=${categoryId}&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`;
        const response = await axios.get(url);

        for (const item of response.data.seriess) {
          //   console.log('item:', item);
          await this.saveEconomicData(item.id, item.title);
        }
      }
    } catch (err) {
      throw new Error('Request Fred API Fail');
    }
  }
}
