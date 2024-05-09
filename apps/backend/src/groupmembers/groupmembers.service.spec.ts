import { Test, TestingModule } from '@nestjs/testing';
import { GroupmembersService } from './groupmembers.service';

describe('GroupmembersService', () => {
  let service: GroupmembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupmembersService],
    }).compile();

    service = module.get<GroupmembersService>(GroupmembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
