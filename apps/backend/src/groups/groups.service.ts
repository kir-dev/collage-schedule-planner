import { Injectable, NotFoundException } from '@nestjs/common';
import { Group, GroupMembers, Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.GroupCreateInput): Promise<Group> {
    try {
      return await this.prisma.group.create({ data });
    } catch {
      throw new NotFoundException('Group could not be created');
    }
  }

  async findAll(): Promise<Group[]> {
    try {
      return await this.prisma.group.findMany();
    } catch {
      throw new NotFoundException('Groups could not be found');
    }
  }

  async findOne(id: number): Promise<Group> {
    try {
      return await this.prisma.group.findUnique({ where: { id } });
    } catch {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
  }

  async findMembers(id: number): Promise<{ user: User; role: Role }[]> {
    const groupMembers = await this.prisma.groupMembers.findMany({
      where: { groupId: id },
      include: { User: true },
    });
    if (!groupMembers) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return groupMembers.map((groupMember) => ({
      user: groupMember.User,
      role: groupMember.role,
    }));
  }

  async update(id: number, data: Prisma.GroupUpdateInput): Promise<Group> {
    try {
      return await this.prisma.group.update({ where: { id }, data });
    } catch {
      throw new NotFoundException(`Group with ID ${id} could not be updated`);
    }
  }

  async remove(id: number): Promise<Group> {
    try {
      return await this.prisma.group.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`Group with ID ${id} could not be deleted`);
    }
  }

  async addMember(groupId: number, userId: number): Promise<GroupMembers> {
    if (await this.prisma.groupMembers.findUnique({ where: { groupId_userId: { groupId, userId } } })) {
      throw new NotFoundException('User is already a member of the group');
    }
    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new NotFoundException('User does not exist');
    }
    try {
      return await this.prisma.groupMembers.create({
        data: {
          groupId,
          userId,
        },
      });
    } catch {
      throw new NotFoundException('User could not be added to the group');
    }
  }

  async updateMemberRole(groupId: number, userId: number, newRole: { role: Role }): Promise<GroupMembers> {
    if (!(await this.prisma.groupMembers.findUnique({ where: { groupId_userId: { groupId, userId } } }))) {
      throw new NotFoundException(`User with id: ${userId} is not a member of the group.`);
    }
    try {
      return await this.prisma.groupMembers.update({
        where: {
          groupId_userId: {
            groupId,
            userId,
          },
        },
        data: {
          role: newRole.role,
        },
      });
    } catch {
      throw new NotFoundException('User role could not be updated.');
    }
  }

  async removeMember(groupId: number, userId: number): Promise<GroupMembers> {
    if (!(await this.prisma.groupMembers.findUnique({ where: { groupId_userId: { groupId, userId } } }))) {
      throw new NotFoundException('User is not a member of the group');
    }
    try {
      return await this.prisma.groupMembers.delete({
        where: {
          groupId_userId: {
            groupId,
            userId,
          },
        },
      });
    } catch {
      throw new NotFoundException('User could not be removed from the group');
    }
  }
}
