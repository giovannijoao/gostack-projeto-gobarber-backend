import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 7, 20, 11).getTime());
    const appointment = await createAppointment.execute({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2020, 7, 20, 12),
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 7, 20, 11).getTime());
    const appointmentDate = new Date(2020, 7, 20, 13);
    await createAppointment.execute({
      provider_id: '123',
      user_id: 'user_id',
      date: appointmentDate,
    });

    await expect(
      createAppointment.execute({
        provider_id: '124',
        date: appointmentDate,
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 7, 20, 11).getTime());
    await expect(
      createAppointment.execute({
        provider_id: '124',
        date: new Date(2020, 6, 20, 11),
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 7, 20, 11).getTime());
    await expect(
      createAppointment.execute({
        date: new Date(2020, 6, 20, 11),
        provider_id: 'user_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment outside attendance hours', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 6, 20, 11).getTime());
    await expect(
      createAppointment.execute({
        date: new Date(2020, 6, 20, 7),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createAppointment.execute({
        date: new Date(2020, 6, 20, 20),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
