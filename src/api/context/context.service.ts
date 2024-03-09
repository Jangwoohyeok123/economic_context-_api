import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContextDto } from './dto/create-context.dto';
import { Contexts } from './entity/context.entity';
import { UserService } from '../user/user.service';
import { UpdateContextDto } from './dto/update-context.dto';

@Injectable()
export class ContextService {
  constructor(
    private userService: UserService,
    @InjectRepository(Contexts)
    private contextRepository: Repository<Contexts>,
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
        customIndicators,
        user: user,
      });

      return this.contextRepository.save(newContext);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getContext(contextId: number): Promise<Contexts> {
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

      return context;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getContextAll(): Promise<Contexts[]> {
    const contextAllList = await this.contextRepository.find();
    return contextAllList;
  }

  async getContextNamesByUser(userId: number): Promise<string[]> {
    try {
      const contexts = await this.contextRepository.find({
        where: { user: { id: userId } },
        select: ['name'],
      });

      if (contexts.length === 0) {
        throw new HttpException('No contexts found', HttpStatus.NOT_FOUND);
      }

      return contexts.map((context) => context.name);
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

      return this.contextRepository.save(context);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteContext(contextId: number): Promise<void> {
    try {
      const result = await this.contextRepository.delete(contextId);
      if (result.affected === 0) {
        throw new HttpException('Context not found', HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
