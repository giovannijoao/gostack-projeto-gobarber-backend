import 'reflect-metadata';
import { eachHourOfInterval } from 'date-fns';
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
    const fullfilledDayHours = eachHourOfInterval(
      {
        start: new Date(2020, 7, 20, 8, 0, 0),
        end: new Date(2020, 7, 20, 12, 0, 0),
      },
      {
        step: 2,
      },
    );
    await Promise.all(
      fullfilledDayHours.map(date =>
        fakeAppointmentsRepository.create({
          date,
          provider_id: 'user',
        }),
      ),
    );
    const availability = await listProvidersDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 8,
      day: 20,
    });
    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: true,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 11,
          available: true,
        },
      ]),
    );
  });
});
