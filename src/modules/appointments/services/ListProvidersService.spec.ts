import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;
describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
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
  it('should be able to recover list from cache', async () => {
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
    const cacheKey = `providers-list:${loggedUser.id}`;
    await fakeCacheProvider.save(cacheKey, users);
    await listProviders.execute(loggedUser.id);
    const saveToCacheFct = jest.spyOn(fakeCacheProvider, 'save');
    expect(saveToCacheFct).not.toBeCalled();
  });
});
