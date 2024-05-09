import { Injectable } from '@nestjs/common';
import { Group, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.GroupCreateInput): Promise<Group> {
    return await this.prisma.group.create({ data });
  }

  async findAll(): Promise<Group[]> {
    return this.prisma.group.findMany();
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.prisma.group.findUnique({ where: { id: id } });
    if (!group) {
      throw new Error(`Group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: number, data: Prisma.GroupUpdateInput): Promise<Group> {
    try {
      return await this.prisma.group.update({ where: { id }, data });
    } catch {
      throw new Error(`Group with ID ${id} could not be updated`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.group.delete({ where: { id } });
    } catch {
      throw new Error(`Group with ID ${id} could not be deleted`);
    }
  }

  addMember(groupId: number, userId: number) {
    return this.prisma.groupMembers.create({
      data: {
        groupId,
        userId,
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
