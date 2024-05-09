import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { GroupmembersService } from './groupmembers.service';

@Controller('groupmembers')
export class GroupmembersController {
  constructor(private readonly groupmembersService: GroupmembersService) {}

  @Post()
  create(@Body() data: Prisma.GroupMembersCreateInput) {
    return this.groupmembersService.create(data);
  }

  @Get()
  findAll() {
    return this.groupmembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') groupId: number, @Param('id') userId: number) {
    return this.groupmembersService.findOne(groupId, userId);
  }

  @Patch(':id')
  update(@Param('id') groupId: number, @Param('id') userId: number, @Body() data: Prisma.GroupMembersUpdateInput) {
    return this.groupmembersService.update(groupId, userId, data);
  }

  @Delete(':id')
  remove(@Param('id') groupId: number, @Param('id') userId: number) {
    return this.groupmembersService.remove(groupId, userId);
  }
}
