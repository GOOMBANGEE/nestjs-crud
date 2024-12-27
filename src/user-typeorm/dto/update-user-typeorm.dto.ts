import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTypeormDto } from './create-user-typeorm.dto';

export class UpdateUserTypeormDto extends PartialType(CreateUserTypeormDto) {}
