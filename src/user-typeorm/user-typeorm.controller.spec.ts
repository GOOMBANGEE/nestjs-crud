import { Test, TestingModule } from '@nestjs/testing';
import { UserTypeormController } from './user-typeorm.controller';
import { UserTypeormService } from './user-typeorm.service';

describe('UserTypeormController', () => {
  let controller: UserTypeormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTypeormController],
      providers: [UserTypeormService],
    }).compile();

    controller = module.get<UserTypeormController>(UserTypeormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
