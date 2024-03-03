import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private UserRepository: Repository<Users>,
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

  async addFavorite(userId: number, newIndicatorId: string) {
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

      await this.UserRepository.createQueryBuilder()
        .update(Users)
        .set({ favorite_indicators: updatedIndicators })
        .where('id = :id', { id: user.id })
        .execute();
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getFavoriteIndicators(userId: number): Promise<string[]> {
    const userEntity = await this.UserRepository.findOneBy({ id: userId });

    if (!userEntity) {
      throw new Error('User not found');
    }

    if (!userEntity.favorite_indicators) {
      return [];
    }

    return userEntity.favorite_indicators.split('|').map(String);
  }
}
