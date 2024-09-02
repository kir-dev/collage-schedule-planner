import { OmitType } from '@nestjs/swagger';

import { Group } from '../entities/group.entity';

export class CreateGroupDto extends OmitType(Group, ['id']) {}
