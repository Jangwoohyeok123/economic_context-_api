import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private UserRepository: Repository<Users>,
  ) {}
  async FindOneById(userId: number): Promise<Users> {
    const user = await this.UserRepository.createQueryBuilder('users')
      .where({ id: userId })
      .getOne();
    return user;
  }

  async FindOneByEmail(email: string): Promise<Users | null> {
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
}
