import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { UserPrismaService } from './user-prisma.service';
import { CreateUserPrismaDto } from './dto/create-user-prisma.dto';
import { UpdateUserPrismaDto } from './dto/update-user-prisma.dto';

@Controller('user-prisma')
export class UserPrismaController {
  constructor(private readonly userPrismaService: UserPrismaService) {}

  @Post()
  create(@Body() createUserPrismaDto: CreateUserPrismaDto) {
    return this.userPrismaService.create(createUserPrismaDto);
  }

  @Get('search')
  search(
    @Query('username') username: string,
    @Query('page') page = 1,
    @Query('limit') limit = 2,
  ) {
    return this.userPrismaService.search(username, page, limit);
  }

  // @Get()
  // @Render('user-prisma/index')
  // findAll() {
  //   return this.userPrismaService.findAll();
  // }

  @Get()
  @Render('user-prisma/index')
  findUserPage(@Query('page') page = 1, @Query('limit') limit = 2) {
    return this.userPrismaService.findUserPage(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPrismaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserPrismaDto: UpdateUserPrismaDto,
  ) {
    return this.userPrismaService.update(id, updateUserPrismaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPrismaService.remove(id);
  }
}
