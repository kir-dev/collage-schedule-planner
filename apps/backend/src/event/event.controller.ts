import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';

/*import { CreateEventDto } from './dto/create-event.dto';*/
/*import { UpdateEventDto } from './dto/update-event.dto';*/
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() data: Prisma.EventCreateInput) {
    return this.eventService.create(data);
  }

  @Get()
  async findAll() {
    return await this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.EventUpdateInput) {
    return await this.eventService.update(Number(id), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.eventService.remove(Number(id));
  }
}
