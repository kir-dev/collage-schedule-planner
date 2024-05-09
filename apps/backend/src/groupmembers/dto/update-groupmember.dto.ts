import { PartialType } from '@nestjs/mapped-types';

import { CreateGroupmemberDto } from './create-groupmember.dto';

export class UpdateGroupmemberDto extends PartialType(CreateGroupmemberDto) {}
