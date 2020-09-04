import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the appointments on a specific day', async () => {
    const appointments = await Promise.all([
      fakeAppointmentsRepository.create({
        date: new Date(2020, 7, 20, 13),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
      fakeAppointmentsRepository.create({
        date: new Date(2020, 7, 20, 14),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ]);
    const availability = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 8,
      day: 20,
    });
    expect(availability).toEqual(appointments);
  });
});
