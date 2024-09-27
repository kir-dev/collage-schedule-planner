import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEventDto): Promise<Event> {
    return await this.prisma.event.create({ data });
  }

  async findAll(): Promise<Event[]> {
    try {
      const res = await this.prisma.event.findMany();
      if (!res) throw new Error();
      return res;
    } catch (error) {
      throw new NotFoundException('Events not found');
    }
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

  async update(id: number, data: UpdateEventDto): Promise<Event> {
    try {
      return await this.prisma.event.update({ where: { id: id }, data });
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
