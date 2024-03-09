import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Indicators } from './entity/indicator.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { IndicatorCategory } from '../common/define';

@Injectable()
export class IndicatorService {
  constructor(
    @InjectRepository(Indicators)
    private indicatorRepository: Repository<Indicators>,
  ) {}
  // Singleton
  private IndicatorsCache: Indicators[] = [];

  async saveIndicatorData(
    seriesId: string,
    title: string,
    categoryId: number,
  ): Promise<void> {
    const existingData = await this.indicatorRepository.findOneBy({ seriesId });

    if (!existingData) {
      const newData = this.indicatorRepository.create({
        seriesId,
        title,
        categoryId,
      });
      await this.indicatorRepository.save(newData);
    }
  }

  public getIndicatorsByIdList(idList: string[]): Indicators[] {
    return this.IndicatorsCache.filter((indicator) =>
      idList.includes(indicator.seriesId),
    );
  }

  async onModuleInit() {
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

        for (const item of response.data.seriess) {
          //   console.log('item:', item);
          await this.saveIndicatorData(item.id, item.title, categoryId);
        }
      }
    } catch (err) {
      throw new Error('Request Fred API Fail');
    }

    try {
      // 전체 laod
      this.IndicatorsCache = await this.indicatorRepository.find();
    } catch (err) {
      throw new Error('indicatorRepository find() Fail');
    }
  }
}
