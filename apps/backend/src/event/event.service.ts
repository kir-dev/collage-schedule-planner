import { Injectable } from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EventCreateInput): Promise<Event> {
    return await this.prisma.event.create({ data: data });
  }

  async findAll(): Promise<Event[]> {
    return await this.prisma.event.findMany();
  }

  findOne(id: number): Promise<Event> {
    return this.prisma.event.findUnique({ where: { id: id } });
  }

  async update(id: number, data: Prisma.EventUpdateInput): Promise<Event> {
    return await this.prisma.event.update({ where: { id: id }, data: data });
  }

  async remove(id: number): Promise<Event> {
    return await this.prisma.event.delete({ where: { id: id } });
  }
}
