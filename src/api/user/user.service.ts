import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { IndicatorService } from '../indicator/indicator.service';
import { Indicators } from '../indicator/entity/indicator.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    private readonly indicatorService: IndicatorService,
  ) {}
  async SelectOneById(userId: number): Promise<User> {
    const user = await this.UserRepository.createQueryBuilder('users')
      .where({ id: userId })
      .getOne();
    return user;
  }

  async SelectOneByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.UserRepository.createQueryBuilder(
      'users',
    )
      .where({ email: email })
      .getOne();
    return user;
  }

  async Create(create_user_dto: CreateUserDto): Promise<User> {
    const user = await this.UserRepository.save(create_user_dto);
    return user;
  }

  async addFavoriteOne(userId: number, newIndicatorId: string) {
    try {
      const user: User = await this.SelectOneById(userId);
      if (!user) {
        throw new HttpException(
          `User id ${userId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const existingIndicators = user.favorite_indicators
        ? user.favorite_indicators.split('|').map(String)
        : [];

      if (existingIndicators.includes(newIndicatorId)) {
        throw new Error('Indicator already added');
      }

      const updatedIndicators = [...existingIndicators, newIndicatorId].join(
        '|',
      );

      const result = await this.UserRepository.createQueryBuilder()
        .update(User)
        .set({ favorite_indicators: updatedIndicators })
        .where('id = :id', { id: user.id })
        .execute();

      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getFavoriteIndicatorsAll(userId: number): Promise<Indicators[]> {
    const user = await this.UserRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException(
        `User id ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!user.favorite_indicators) {
      return [];
    }

    const idList = user.favorite_indicators.split('|').map(String);
    return this.indicatorService.getIndicatorsByIdList(idList);
  }

  async getFavoriteIndicatorsByType(
    userId: number,
    categoryId: number,
  ): Promise<Indicators[]> {
    const user = await this.UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new HttpException(
        `User id ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!user.favorite_indicators) {
      return [];
    }

    const idList = user.favorite_indicators.split('|').map(String);
    const indicatorsList = this.indicatorService.getIndicatorsByIdList(idList);
    return indicatorsList.filter(
      (indicator) => indicator.category_id == categoryId,
    );
  }

  async deleteFavoriteOne(userId: number, deleteIndicatorId: string) {
    try {
      const user: User = await this.SelectOneById(userId);
      if (!user) {
        throw new HttpException(
          `User id ${userId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const existingIndicators = user.favorite_indicators
        ? user.favorite_indicators.split('|').map(String)
        : [];

      // 삭제하려는 인디케이터 ID가 존재하는지 확인 후 제거
      if (!existingIndicators.includes(deleteIndicatorId)) {
        throw new Error('Indicator not found in favorites');
      }

      const updatedIndicators = existingIndicators
        .filter((id) => id !== deleteIndicatorId)
        .join('|');

      await this.UserRepository.createQueryBuilder()
        .update(User)
        .set({ favorite_indicators: updatedIndicators })
        .where('id = :id', { id: userId })
        .execute();
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
