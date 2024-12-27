import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { UserTypeormService } from './user-typeorm.service';
import { CreateUserTypeormDto } from './dto/create-user-typeorm.dto';
import { UpdateUserTypeormDto } from './dto/update-user-typeorm.dto';

@Controller('user-typeorm')
export class UserTypeormController {
  constructor(private readonly userTypeormService: UserTypeormService) {}

  @Post()
  create(@Body() createUserTypeormDto: CreateUserTypeormDto) {
    return this.userTypeormService.create(createUserTypeormDto);
  }

  @Get('search')
  search(@Query('username') username: string) {
    return this.userTypeormService.search(username);
  }

  @Get()
  @Render('user-typeorm/index')
  findAll() {
    return this.userTypeormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userTypeormService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserTypeormDto: UpdateUserTypeormDto,
  ) {
    return this.userTypeormService.update(id, updateUserTypeormDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userTypeormService.remove(id);
  }
}
