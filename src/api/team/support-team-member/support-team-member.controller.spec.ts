import { Test, TestingModule } from '@nestjs/testing';
import { SupportTeamMemberController } from './support-team-member.controller';
import { SupportTeamMemberService } from './support-team-member.service';

describe('SupportTeamMemberController', () => {
  let controller: SupportTeamMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportTeamMemberController],
      providers: [SupportTeamMemberService],
    }).compile();

    controller = module.get<SupportTeamMemberController>(SupportTeamMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
