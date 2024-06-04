import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [UserModule, PrismaModule.forRoot({ isGlobal: true }), EventModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
