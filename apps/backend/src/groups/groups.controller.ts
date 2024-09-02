import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Role } from '@prisma/client';

import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() data: CreateGroupDto) {
    return this.groupsService.create(data);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(id);
  }

  @Get(':id/members')
  findMembers(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findMembers(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateGroupDto) {
    return this.groupsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.remove(id);
  }

  @Post(':id/members/:userId')
  addMember(@Param('id', ParseIntPipe) id: number, @Param('userId') userId: number) {
    return this.groupsService.addMember(id, Number(userId));
  }

  @Patch(':id/members/:userId')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() newRole: { role: Role }
  ) {
    return this.groupsService.updateMemberRole(id, userId, newRole);
  }

  @Delete(':id/members/:userId')
  removeMember(@Param('id', ParseIntPipe) id: number, @Param('userId', ParseIntPipe) userId: number) {
    return this.groupsService.removeMember(id, userId);
  }
}
