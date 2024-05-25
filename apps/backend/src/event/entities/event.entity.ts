import { Category, Group, Priority, Status, User } from '@prisma/client';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Event {
  @IsInt()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  location: string;
  @IsDate()
  startDate: Date;
  @IsDate()
  endDate: Date;
  @IsDate()
  startTime: Date;
  @IsDate()
  endTime: Date;
  priority: Priority;
  status: Status;
  @IsInt()
  categoryId: number;
  category: Category;
  @IsInt()
  ownerUserId: number;
  ownerUser: User;
  @IsInt()
  ownerGroupId: number;
  ownerGroup: Group;
}
