import { Injectable, NotFoundException } from '@nestjs/common';
import { Group, GroupMembers, Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.GroupCreateInput): Promise<Group> {
    return await this.prisma.group.create({ data });
  }

  async findAll(): Promise<Group[]> {
    if (!this.prisma.group) {
      throw new NotFoundException('Groups not found');
    }
    return await this.prisma.group.findMany();
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.prisma.group.findUnique({ where: { id: id } });
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async findMembers(id: number): Promise<User[]> {
    const userids = await this.prisma.groupMembers.findMany({
      where: {
        groupId: id,
      },
    });
    const members = await this.prisma.user.findMany({
      where: {
        id: {
          in: userids.map((member) => member.userId),
        },
      },
    });
    return members;
  }

  async update(id: number, data: Prisma.GroupUpdateInput): Promise<Group> {
    try {
      return await this.prisma.group.update({ where: { id }, data });
    } catch {
      throw new NotFoundException(`Group with ID ${id} could not be updated`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.group.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`Group with ID ${id} could not be deleted`);
    }
  }

  async addMember(groupId: number, userId: number): Promise<GroupMembers> {
    const groupMember = await this.prisma.groupMembers.create({
      data: {
        groupId: groupId,
        userId: userId,
      },
    });
    return this.prisma.groupMembers.create({ groupMember });
  }

  async updateMember(groupId: number, userId: number, newRole: Role): Promise<GroupMembers> {
    return this.prisma.groupMembers.update({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
      data: {
        role: newRole,
      },
    });
  }

  removeMember(groupId: number, userId: number) {
    return this.prisma.groupMembers.delete({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });
  }
}
