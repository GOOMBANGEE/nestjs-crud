import { Test, TestingModule } from '@nestjs/testing';
import { UserPrismaController } from './user-prisma.controller';
import { UserPrismaService } from './user-prisma.service';

describe('UserPrismaController', () => {
  let controller: UserPrismaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPrismaController],
      providers: [UserPrismaService],
    }).compile();

    controller = module.get<UserPrismaController>(UserPrismaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
