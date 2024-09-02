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
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found ${error.message}`);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new NotFoundException(`Users not found ${error.message}`);
    }
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    try {
      return await this.prisma.user.update({ where: { id }, data: data });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found ${error.message}`);
    }
  }

  async remove(id: number): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found ${error.message}`);
    }
  }
}
