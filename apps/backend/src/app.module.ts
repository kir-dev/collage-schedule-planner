import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';
import { GroupmembersModule } from './groupmembers/groupmembers.module';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), GroupsModule, GroupmembersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
