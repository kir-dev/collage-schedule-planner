import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';

import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() data: Prisma.GroupCreateInput) {
    return this.groupsService.create(data);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(Number(id));
  }

  @Get(':id/members')
  findMembers(@Param('id') id: string) {
    return this.groupsService.findMembers(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.GroupUpdateInput) {
    return this.groupsService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(Number(id));
  }

  @Post(':id/members/:userId')
  addMember(@Param('id') id: string, @Param('userId') userId: string) {
    return this.groupsService.addMember(Number(id), Number(userId));
  }

  @Patch(':id/members/:userId')
  updateRole(@Param('id') id: string, @Param('userId') userId: string, @Body() newRole: { role: Role }) {
    return this.groupsService.updateMemberRole(Number(id), Number(userId), newRole);
  }

  @Delete(':id/members/:userId')
  removeMember(@Param('id') id: string, @Param('userId') userId: string) {
    return this.groupsService.removeMember(Number(id), Number(userId));
  }
}
