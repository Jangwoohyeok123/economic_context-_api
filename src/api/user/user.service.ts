import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { IndicatorService } from '../indicator/indicator.service';
import { Indicators } from '../indicator/entity/indicator.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private UserRepository: Repository<Users>,
    private readonly indicatorService: IndicatorService,
  ) {}
  async SelectOneById(userId: number): Promise<Users> {
    const user = await this.UserRepository.createQueryBuilder('users')
      .where({ id: userId })
      .getOne();
    return user;
  }

  async SelectOneByEmail(email: string): Promise<Users | null> {
    const user: Users | null = await this.UserRepository.createQueryBuilder(
      'users',
    )
      .where({ email: email })
      .getOne();
    return user;
  }

  async Create(create_user_dto: CreateUserDto): Promise<Users> {
    const user = await this.UserRepository.save(create_user_dto);
    return user;
  }

  async addFavoriteOne(userId: number, newIndicatorId: string) {
    try {
      const user: Users = await this.SelectOneById(userId);
      if (!user) {
        throw new Error('Request User is undefined');
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
        .update(Users)
        .set({ favorite_indicators: updatedIndicators })
        .where('id = :id', { id: user.id })
        .execute();

      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getFavoriteIndicatorsAll(userId: number): Promise<Indicators[]> {
    const userEntity = await this.UserRepository.findOneBy({ id: userId });

    if (!userEntity) {
      throw new Error('User not found');
    }

    if (!userEntity.favorite_indicators) {
      return [];
    }

    const idList = userEntity.favorite_indicators.split('|').map(String);
    return this.indicatorService.getIndicatorsByIdList(idList);
  }

  async getFavoriteIndicatorsByType(
    userId: number,
    categoryId: number,
  ): Promise<Indicators[]> {
    const userEntity = await this.UserRepository.findOneBy({ id: userId });

    if (!userEntity) {
      throw new Error('User not found');
    }

    if (!userEntity.favorite_indicators) {
      return [];
    }

    const idList = userEntity.favorite_indicators.split('|').map(String);
    const indicatorsList = this.indicatorService.getIndicatorsByIdList(idList);
    return indicatorsList.filter(
      (indicator) => indicator.categoryId == categoryId,
    );
  }

  async deleteFavoriteOne(userId: number, deleteIndicatorId: string) {
    try {
      const user: Users = await this.SelectOneById(userId);
      if (!user) {
        throw new Error('Request User is undefined');
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
        .update(Users)
        .set({ favorite_indicators: updatedIndicators })
        .where('id = :id', { id: userId })
        .execute();
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
