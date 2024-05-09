import { Module } from '@nestjs/common';
import { GroupmembersService } from './groupmembers.service';
import { GroupmembersController } from './groupmembers.controller';

@Module({
  controllers: [GroupmembersController],
  providers: [GroupmembersService],
})
export class GroupmembersModule {}
