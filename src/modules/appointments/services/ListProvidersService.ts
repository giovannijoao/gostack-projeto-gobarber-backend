import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import cache from '@config/cache';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('CacheProvider') private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<User[]> {
    const cacheKey = `providers-list:${user_id}`;
    let users = await this.cacheProvider.recover<User[]>(cacheKey);
    if (!users) {
      users = await this.usersRepository.findAllUsers({
        expect_user_id: user_id,
      });
      await this.cacheProvider.save(cacheKey, users);
    }
    return users;
  }
}

export default ListProvidersService;
