import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Indicator } from './entity/indicator.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { IndicatorCategory, FredAPIData } from '../common/define';

@Injectable()
export class IndicatorService {
  constructor(
    @InjectRepository(Indicator)
    private indicatorRepository: Repository<Indicator>,
  ) {}
  // Singleton
  private IndicatorsCache: Indicator[] = [];

  async saveIndicatorData(
    seriesId: string,
    title: string,
    categoryId: number,
    notes: string,
    frequency: string,
    popularity: number,
    observation_end: string,
    observation_start: string,
  ): Promise<void> {
    const existingData = await this.indicatorRepository.findOneBy({
      id: seriesId,
    });
    if (!existingData) {
      const newData = this.indicatorRepository.create({
        id: seriesId,
        title,
        category_id: categoryId,
        notes,
        frequency,
        popularity,
        observation_end,
        observation_start,
      });
      await this.indicatorRepository.save(newData);
    }
  }

  public getIndicatorsByIdList(idList: string[]): Indicator[] {
    return this.IndicatorsCache.filter((indicator) =>
      idList.includes(indicator.id),
    );
  }

  async onModuleInit() {
    const indicatorData = await this.indicatorRepository.find();
    if (indicatorData.length == 0) {
      const baseUrl = 'https://api.stlouisfed.org/fred/'; // baseUrl 정의
      const categoryIds = [
        IndicatorCategory.Interest,
        IndicatorCategory.Exchange,
        IndicatorCategory.Consume,
        IndicatorCategory.Production,
      ];

      try {
        for (const categoryId of categoryIds) {
          const url = `${baseUrl}category/series?category_id=${categoryId}&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`;
          const response = await axios.get(url);

          const itemList: FredAPIData[] = response.data.seriess;
          for (const item of itemList) {
            await this.saveIndicatorData(
              item.id,
              item.title,
              categoryId,
              item.notes,
              item.frequency,
              item.popularity,
              item.observation_end,
              item.observation_start,
            );
          }
        }
      } catch (err) {
        console.error(err);
        throw new Error('Request Fred API Fail');
      }
    }

    try {
      // 전체 laod
      this.IndicatorsCache = await this.indicatorRepository.find();
    } catch (err) {
      throw new Error('indicatorRepository find() Fail');
    }
  }
}
