import { Test, TestingModule } from '@nestjs/testing';
import { UnpluggedService } from './unplugged.service';

describe('UnpluggedService', () => {
  let service: UnpluggedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnpluggedService],
    }).compile();

    service = module.get<UnpluggedService>(UnpluggedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
