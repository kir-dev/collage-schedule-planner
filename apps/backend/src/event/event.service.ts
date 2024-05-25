import { Injectable, NotFoundException } from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EventCreateInput): Promise<Event> {
    return await this.prisma.event.create({ data });
  }

  async findAll(): Promise<Event[]> {
    return await this.prisma.event.findMany();
  }

  async findOne(id: number): Promise<Event> {
    try {
      const res = await this.prisma.event.findUnique({ where: { id: id } });
      if (!res) throw new Error();
      return res;
    } catch (e) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }

  async update(id: number, data: Prisma.EventUpdateInput): Promise<Event> {
    try {
      return await this.prisma.event.update({ where: { id: id }, data: data });
    } catch (e) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }

  async remove(id: number): Promise<Event> {
    try {
      return await this.prisma.event.delete({ where: { id: id } });
    } catch (e) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
}