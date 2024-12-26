import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Render,
} from '@nestjs/common';
import { UserPrismaService } from './user-prisma.service';
import { CreateUserPrismaDto } from './dto/create-user-prisma.dto';
import { UpdateUserPrismaDto } from './dto/update-user-prisma.dto';

@Controller('user-prisma')
export class UserPrismaController {
  constructor(private readonly userPrismaService: UserPrismaService) {}

  @Post()
  async create(@Body() createUserPrismaDto: CreateUserPrismaDto) {
    return await this.userPrismaService.create(createUserPrismaDto);
  }

  @Get()
  @Render('user-prisma/index')
  async findAll() {
    let userList = await this.userPrismaService.findAll();
    return { userList }; // 반드시 객체로 감싸 반환
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userPrismaService.findOne(id);
    return { user };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserPrismaDto: UpdateUserPrismaDto,
  ) {
    return await this.userPrismaService.update(id, updateUserPrismaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userPrismaService.remove(id);
  }
}
