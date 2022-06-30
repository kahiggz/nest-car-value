import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthService = {
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      signUp: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'test@fjdj.com',
          password: 'something',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          { id: 890, email, password: 'something' } as User,
        ]);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all users with a certain email', async () => {
    const users = await controller.findAllUsers('test@jh.com');
    expect(users).toBeDefined();
  });

  it('should throw an error when no users are found', async () => {
    try {
      await controller.findAllUsers('test@jh.com');
    } catch (error) {
      exp;
    }
  });
});
