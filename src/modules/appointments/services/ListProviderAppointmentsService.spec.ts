import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
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
  it('should be able to recover list from cache', async () => {
    const appointment = await fakeAppointmentsRepository.create({
      date: new Date(2020, 7, 20, 13),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });
    const cacheKey = `providers-appointments:provider_id:2020-8-20`;
    await fakeCacheProvider.save(cacheKey, [appointment]);
    await listProviderAppointments.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 8,
      day: 20,
    });
    const saveToCacheFct = jest.spyOn(fakeCacheProvider, 'save');
    expect(saveToCacheFct).not.toBeCalled();
  });
});
