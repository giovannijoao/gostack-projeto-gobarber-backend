import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list all providers except logged in', async () => {
    const users = await Promise.all([
      fakeUsersRepository.create({
        name: 'User 1',
        email: 'user1@example.com',
        password: '123456',
      }),
      fakeUsersRepository.create({
        name: 'User 2',
        email: 'user2@example.com',
        password: '123456',
      }),
    ]);
    const loggedUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute(loggedUser.id);
    expect(providers).toEqual(users);
  });
});
