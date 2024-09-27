import { Priority, Status } from '@prisma/client';
import { IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Event {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsDateString()
  @IsOptional()
  startTime: Date;

  @IsDateString()
  @IsOptional()
  endTime: Date;

  @IsEnum(Priority)
  priority: Priority;

  @IsEnum(Status)
  status: Status;

  @IsInt()
  @IsOptional()
  categoryId: number;

  @IsInt()
  @IsOptional()
  ownerUserId: number;

  @IsInt()
  @IsOptional()
  ownerGroupId: number;
}
