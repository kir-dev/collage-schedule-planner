import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GroupMembers } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GroupmembersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.GroupMembersCreateInput): Promise<GroupMembers> {
    return await this.prisma.groupMembers.create({ data });
  }

  async findAll(): Promise<GroupMembers[]> {
    return this.prisma.groupMembers.findMany();
  }

  async findOne(groupId: number, userId: number): Promise<GroupMembers> {
    const groupmember = await this.prisma.groupMembers.findUnique({ where: { groupId_userId: { groupId, userId } } });
    if (!groupmember) {
      throw new NotFoundException(`Groupmember with this ID not found`);
    }
    return groupmember;
  }

  async update(groupId: number, userId: number, data: Prisma.GroupMembersUpdateInput): Promise<GroupMembers> {
    try {
      return await this.prisma.groupMembers.update({ where: { groupId_userId: { groupId, userId } }, data });
    } catch {
      throw new NotFoundException(`Groupmember with this ID could not be updated`);
    }
  }

  async remove(groupId: number, userId: number) {
    try {
      return await this.prisma.groupMembers.delete({ where: { groupId_userId: { groupId, userId } } });
    } catch {
      throw new NotFoundException(`Groupmember with this ID could not be deleted`);
    }
  }
}
