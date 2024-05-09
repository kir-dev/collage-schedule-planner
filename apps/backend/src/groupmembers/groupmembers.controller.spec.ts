import { Test, TestingModule } from '@nestjs/testing';

import { GroupmembersController } from './groupmembers.controller';
import { GroupmembersService } from './groupmembers.service';

describe('GroupmembersController', () => {
  let controller: GroupmembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupmembersController],
      providers: [GroupmembersService],
    }).compile();

    controller = module.get<GroupmembersController>(GroupmembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
