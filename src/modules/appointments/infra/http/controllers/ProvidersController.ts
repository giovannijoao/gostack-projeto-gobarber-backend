import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersControlller {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: loggedUserId } = request.user;
    const listProvider = container.resolve(ListProvidersService);
    const providers = await listProvider.execute(loggedUserId);
    providers.forEach(p => {
      const provider = p;
      delete provider.password;
    });
    return response.json(providers);
  }
}
