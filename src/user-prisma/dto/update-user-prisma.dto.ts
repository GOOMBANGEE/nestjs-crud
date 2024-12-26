import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPrismaDto } from './create-user-prisma.dto';

export class UpdateUserPrismaDto extends PartialType(CreateUserPrismaDto) {}
