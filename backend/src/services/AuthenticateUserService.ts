import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new Error('Incorrect email/password combination');
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched)
      throw new Error('Incorrect email/password combination');
    // TODO: Put secret into environment file
    const token = sign({}, '0f731fa23e3ee16d5d6186ded06b23ca', {
      subject: user.id,
      expiresIn: '1d',
    });
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
