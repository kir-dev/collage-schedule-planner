import { Priority, Status } from '@prisma/client';

export type Event = {
  id: number;
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  priority: Priority;
  status: Status;
  categoryId: number;
  ownerUserId: number;
  ownerGroupId: number;
};
