import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({ data: data });
      return newUser;
    } catch (error) {
      throw new Error(`User not created ${error.message}`);
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`Task with ID ${id} not found`);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    if (!id) throw new NotFoundException(`Task with ID ${id} not found`);
    return await this.prisma.user.update({ where: { id }, data: data });
  }

  async remove(id: number): Promise<User> {
    if (!id) throw new NotFoundException(`Task with ID ${id} not found`);
    return await this.prisma.user.delete({ where: { id } });
  }
}
