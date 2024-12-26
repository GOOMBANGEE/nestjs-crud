import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserPrismaDto } from './dto/create-user-prisma.dto';
import { UpdateUserPrismaDto } from './dto/update-user-prisma.dto';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class UserPrismaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserPrismaDto: CreateUserPrismaDto) {
    const { passwordConfirm, ...userData } = createUserPrismaDto;
    if (userData.password !== passwordConfirm) {
      throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);
    }

    const user = await this.prisma.user.create({ data: userData });
    console.log('Created User:', user);
    return user.username;
  }

  async findAll() {
    const userList = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    console.log({ userList });
    return userList;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    console.log('User: ', user);
    return user;
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
    return updatedUser.username;
  }

  async remove(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    console.log('Deleted User: ', deletedUser);
    return deletedUser.username;
  }
}
