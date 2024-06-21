import { Priority, Status } from '@prisma/client';
import { IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Category {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  color?: string;

  @IsString()
  @IsOptional()
  description: string;
}
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
  @IsOptional()
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
  @IsOptional()
  priority: Priority;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsInt()
  categoryId: number;

  @IsInt()
  ownerUserId: number;

  @IsInt()
  ownerGroupId: number;
}
