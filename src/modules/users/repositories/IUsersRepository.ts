import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllUsersDTO from '../dtos/IFindAllUsersDTO';

export default interface IUsersRepository {
  /** Find user by primary key */
  findById(id: string): Promise<User | undefined>;
  /** Find user by email */
  findByEmail(email: string): Promise<User | undefined>;
  /** Create an user */
  create(data: ICreateUserDTO): Promise<User>;
  /** Saves an user */
  save(data: User): Promise<User>;
  /** Return a list of users */
  findAllUsers(data: IFindAllUsersDTO): Promise<User[]>;
}
