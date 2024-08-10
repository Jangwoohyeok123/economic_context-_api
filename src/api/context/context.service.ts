import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Context } from './entity/context.entity';
// import { Journals } from '../journal/entity/journal.entity';
import { UserService } from '../user/user.service';
// import { UpdateContextDto } from './dto/update-context.dto';
import { IndicatorService } from '../indicator/indicator.service';
// import { ResponseContextDto } from './dto/response-context.dto';

@Injectable()
export class ContextService {
  constructor(
    private userService: UserService,
    @InjectRepository(Context)
    private contextRepository: Repository<Context>,
    private readonly indicatorService: IndicatorService,
    private dataSource: DataSource, // DataSource를 사용하여 트랜잭션을 관리
  ) {}

  /* 
    Service 알고리즘
    1. userId를 전송받아 userRepo에 해당 user를 찾는다.
      - 매개변수로 전달받을 userId는 controller에서 service를 호출하며 전달받는다. 
    2. user가 없는 상황을 early return으로 처리한다. 
    3. user가 존재하면 contextRepo에서 해당 user의 contextList를 찾는다.
    4. contextList를 promise객체로 wrapping하여 반환한다.
  */
  async getContextList(userId: number): Promise<Context[]> {
    const user = await this.userService.SelectOneById(userId);
    if (!user) return [];

    // const contextList = await this.contextRepository.find({
    //   where: { user: { id: userId } },
    //   order: { createdAt: 'DESC' },
    //   select: [],
    // });

    const contextList = await this.dataSource.query(
      'SELECT * FROM contexts WHERE user_id = ? ORDER BY created_at DESC',
      [userId],
    );

    return contextList;
  }

  // async getContext(contextId: number): Promise<ResponseContextDto> {
  //   try {
  //     const context = await this.contextRepository.findOne({
  //       where: { id: contextId },
  //       relations: ['journals'],
  //     });

  //     if (!context) {
  //       throw new HttpException(
  //         `Context with id ${contextId} not found`,
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }

  //     return new ResponseContextDto(context);
  //   } catch (err) {
  //     throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // /*
  //   @description 로그인되면 최신순 ContextList 반환 그렇지 않으면 빈 배열 반환
  // */
  // async getContextList(userId: number): Promise<Contexts[]> {
  //   const user = await this.userService.SelectOneById(userId);
  //   if (!user) {
  //     return [];
  //   }

  //   const contextList = await this.contextRepository.find({
  //     where: { user: { id: userId } },
  //     order: { createdAt: 'DESC' },
  //     select: [],
  //   });
  //   return contextList;
  // }

  // async getContextNamesByUser(userId: number): Promise<Contexts[]> {
  //   try {
  //     const contexts = await this.contextRepository.find({
  //       where: { user: { id: userId } },
  //       select: ['id', 'name'],
  //     });

  //     if (contexts.length === 0) {
  //       throw new HttpException('No contexts found', HttpStatus.NOT_FOUND);
  //     }

  //     return contexts;
  //   } catch (err) {
  //     throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // async updateContext(
  //   contextId: number,
  //   updateContextDto: UpdateContextDto,
  // ): Promise<Contexts> {
  //   try {
  //     const context = await this.contextRepository.findOneBy({ id: contextId });
  //     if (!context) {
  //       throw new HttpException('Context not found', HttpStatus.NOT_FOUND);
  //     }

  //     if (updateContextDto.name) {
  //       context.name = updateContextDto.name;
  //     }

  //     if (updateContextDto.label) {
  //       context.label = updateContextDto.label;
  //     }

  //     return this.contextRepository.save(context);
  //   } catch (err) {
  //     throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // async deleteContext(contextId: number): Promise<void> {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     await queryRunner.manager
  //       .getRepository(Journals)
  //       .createQueryBuilder()
  //       .delete()
  //       .from(Journals)
  //       .where('context_id = :contextId', { contextId: contextId })
  //       .execute();
  //     await queryRunner.manager.getRepository(Contexts).delete(contextId);
  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     await queryRunner.rollbackTransaction();
  //     throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }
}
