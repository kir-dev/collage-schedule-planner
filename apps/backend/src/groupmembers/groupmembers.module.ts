import { Module } from '@nestjs/common';

import { GroupmembersController } from './groupmembers.controller';
import { GroupmembersService } from './groupmembers.service';

@Module({
  controllers: [GroupmembersController],
  providers: [GroupmembersService],
})
export class GroupmembersModule {}
