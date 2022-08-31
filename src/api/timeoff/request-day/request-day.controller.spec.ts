import { Test, TestingModule } from '@nestjs/testing';
import { RequestDayController } from './request-day.controller';
import { RequestDayService } from './request-day.service';

describe('RequestDayController', () => {
  let controller: RequestDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestDayController],
      providers: [RequestDayService],
    }).compile();

    controller = module.get<RequestDayController>(RequestDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
