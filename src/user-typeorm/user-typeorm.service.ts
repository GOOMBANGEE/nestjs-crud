import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserTypeormDto } from './dto/create-user-typeorm.dto';
import { UpdateUserTypeormDto } from './dto/update-user-typeorm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeorm } from './entities/user-typeorm.entity';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserTypeormService {
  constructor(
    @InjectRepository(UserTypeorm)
    private readonly userTypeormRepository: Repository<UserTypeorm>,
  ) {}

  async create(createUserTypeormDto: CreateUserTypeormDto) {
    const { passwordConfirm, ...userData } = createUserTypeormDto;
    if (userData.password !== passwordConfirm) {
      throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);
    }
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRound);

    const user = this.userTypeormRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.userTypeormRepository.save(user);

    return { username: user.username };
  }

  async search(username: string) {
    // const userList = await this.userTypeormRepository
    //   .createQueryBuilder('user')
    //   .select(['user.id', 'user.username'])
    //   .where('user.username ILIKE :username', { username: `%${username}%` }) // postgres
    //   .getMany();
    const userList = await this.userTypeormRepository.find({
      where: {
        username: Like(`%${username.toLowerCase()}%`),
      },
    });

    console.log(userList);
    return { userList };
  }

  async findAll() {
    const userList = await this.userTypeormRepository.find();
    return { userList };
  }

  async findOne(id: number) {
    const user = await this.userTypeormRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }
    return { user };
  }

  async update(id: number, updateUserTypeormDto: UpdateUserTypeormDto) {
    const { passwordConfirm, ...userData } = updateUserTypeormDto;
    if (userData.password !== passwordConfirm) {
      throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);
    }

    await this.userTypeormRepository.update(id, userData);
    return { username: userData.username };
  }

  async remove(id: number) {
    const user = await this.userTypeormRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    await this.userTypeormRepository.remove(user);
    return { username: user.username };
  }
}
