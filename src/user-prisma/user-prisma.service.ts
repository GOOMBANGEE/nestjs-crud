import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserPrismaDto } from './dto/create-user-prisma.dto';
import { UpdateUserPrismaDto } from './dto/update-user-prisma.dto';
import { PrismaService } from '../common/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPrismaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserPrismaDto: CreateUserPrismaDto) {
    const { passwordConfirm, ...userData } = createUserPrismaDto;
    if (userData.password !== passwordConfirm) {
      throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);
    }
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRound);

    const user = await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
    console.log('Created User:', user);
    return { username: user.username };
  }

  async search(username: string, page: number, limit: number) {
    const userList = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        username: true,
      },
      where: {
        username: {
          contains: username,
          mode: 'insensitive', // 대소문자 구분 X
        },
      },
    });
    const total = await this.prisma.user.count({
      where: {
        username: {
          contains: username,
          mode: 'insensitive', // 대소문자 구분 X
        },
      },
    });

    console.log('search: ', userList);
    return {
      userList,
      currentPage: page,
      totalPage: Math.ceil(total / limit),
    };
  }

  async findAll() {
    const userList = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    console.log('findAll: ', { userList });
    return { userList };
  }

  async findUserPage(page: number, limit: number) {
    const userList = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await this.prisma.user.count();

    console.log('userList: ', userList);
    console.log('total: ', total);
    console.log('page: ', page);
    console.log('totalPage: ', Math.ceil(total / limit));

    return {
      userList,
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    console.log('User: ', user);
    return { user };
  }

  async update(id: string, updateUserPrismaDto: UpdateUserPrismaDto) {
    const { passwordConfirm, ...userData } = updateUserPrismaDto;
    if (userData.password !== passwordConfirm) {
      throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: userData,
    });
    console.log('Updated User: ', updatedUser);
    return { username: updatedUser.username };
  }

  async remove(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    console.log('Deleted User: ', deletedUser);
    return { username: deletedUser.username };
  }
}
