import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
