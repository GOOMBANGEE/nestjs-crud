import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Render,
} from '@nestjs/common';
import { UserTypeormService } from './user-typeorm.service';
import { CreateUserTypeormDto } from './dto/create-user-typeorm.dto';
import { UpdateUserTypeormDto } from './dto/update-user-typeorm.dto';

@Controller('user-typeorm')
export class UserTypeormController {
  constructor(private readonly userTypeormService: UserTypeormService) {}

  @Post()
  async create(@Body() createUserTypeormDto: CreateUserTypeormDto) {
    return await this.userTypeormService.create(createUserTypeormDto);
  }

  @Get()
  @Render('user-typeorm/index')
  async findAll() {
    const userList = await this.userTypeormService.findAll();
    return { userList };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userTypeormService.findOne(id);
    return { user };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserTypeormDto: UpdateUserTypeormDto,
  ) {
    return await this.userTypeormService.update(id, updateUserTypeormDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userTypeormService.remove(id);
  }
}
