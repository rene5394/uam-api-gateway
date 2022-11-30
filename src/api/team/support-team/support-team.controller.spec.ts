import { Test, TestingModule } from '@nestjs/testing';
import { SupportTeamController } from './support-team.controller';
import { SupportTeamService } from './support-team.service';

describe('SupportTeamController', () => {
  let controller: SupportTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportTeamController],
      providers: [SupportTeamService],
    }).compile();

    controller = module.get<SupportTeamController>(SupportTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
