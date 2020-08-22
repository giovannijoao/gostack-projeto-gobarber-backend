import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the day availability from provider', async () => {
    await Promise.all([
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
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 7, 20, 11).getTime());
    const availability = await listProvidersDayAvailability.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 8,
      day: 20,
    });
    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 12,
          available: true,
        },
        {
          hour: 13,
          available: false,
        },
        {
          hour: 14,
          available: false,
        },
        {
          hour: 15,
          available: true,
        },
      ]),
    );
  });
});
