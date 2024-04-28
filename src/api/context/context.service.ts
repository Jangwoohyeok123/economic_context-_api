import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateContextDto } from './dto/create-context.dto';
import { Contexts } from './entity/context.entity';
import { Journals } from '../journal/entity/journal.entity';
import { UserService } from '../user/user.service';
import { UpdateContextDto } from './dto/update-context.dto';
import { IndicatorService } from '../indicator/indicator.service';
import { Indicators } from '../indicator/entity/indicator.entity';
import { ResponseContextDto } from './dto/response-context.dto';

@Injectable()
export class ContextService {
  constructor(
    private userService: UserService,
    @InjectRepository(Contexts)
    private contextRepository: Repository<Contexts>,
    private readonly indicatorService: IndicatorService,
    private dataSource: DataSource, // DataSource를 사용하여 트랜잭션을 관리
  ) {}

  async createContext(
    userId: number,
    createContextDto: CreateContextDto,
  ): Promise<Contexts> {
    try {
      const user = await this.userService.SelectOneById(userId);
      if (!user) {
        throw new HttpException(
          `User id ${userId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const customIndicators = createContextDto.customIndicators
        .map((indicator) => indicator.seriesId)
        .join('|');

      const newContext = this.contextRepository.create({
        name: createContextDto.name,
        label: createContextDto.label,
        customIndicators,
        user: user,
      });

      return this.contextRepository.save(newContext);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getContext(contextId: number): Promise<ResponseContextDto> {
    try {
      const context = await this.contextRepository.findOne({
        where: { id: contextId },
        relations: ['journals'],
      });

      if (!context) {
        throw new HttpException(
          `Context with id ${contextId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      let customIndicators: Indicators[] = [];
      if (context.customIndicators) {
        // customIndicators 문자열을 파싱하여 인디케이터 ID 리스트를 추출
        const indicatorIds = context.customIndicators.split('|');
        // 인디케이터 ID 리스트를 사용하여 Indicators 엔티티들을 조회
        customIndicators =
          this.indicatorService.getIndicatorsByIdList(indicatorIds);
      }

      return new ResponseContextDto(context, customIndicators);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getContextAll(userId: number): Promise<Contexts[]> {
    const contextAllList = await this.contextRepository.find({
      where: { user: { id: userId } },
      select: [],
    });
    return contextAllList;
  }

  async getContextNamesByUser(userId: number): Promise<Contexts[]> {
    try {
      const contexts = await this.contextRepository.find({
        where: { user: { id: userId } },
        select: ['id', 'name'],
      });

      if (contexts.length === 0) {
        throw new HttpException('No contexts found', HttpStatus.NOT_FOUND);
      }

      return contexts;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateContext(
    contextId: number,
    updateContextDto: UpdateContextDto,
  ): Promise<Contexts> {
    try {
      const context = await this.contextRepository.findOneBy({ id: contextId });
      if (!context) {
        throw new HttpException('Context not found', HttpStatus.NOT_FOUND);
      }

      // Indicators[]에서 ID 리스트를 추출하고 파이프로 조인
      if (updateContextDto.customIndicators) {
        const customIndicatorsString = updateContextDto.customIndicators
          .map((indicator) => indicator.seriesId)
          .join('|');
        context.customIndicators = customIndicatorsString;
      }

      if (updateContextDto.name) {
        context.name = updateContextDto.name;
      }

      if (updateContextDto.label) {
        context.label = updateContextDto.label;
      }

      return this.contextRepository.save(context);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteContext(contextId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .getRepository(Journals)
        .createQueryBuilder()
        .delete()
        .from(Journals)
        .where('context_id = :contextId', { contextId: contextId })
        .execute();
      await queryRunner.manager.getRepository(Contexts).delete(contextId);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
