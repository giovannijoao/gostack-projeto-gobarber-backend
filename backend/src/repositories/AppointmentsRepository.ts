import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return [...this.appointments];
  }

  /**
   * Find a booked appointment to the same date
   */
  public findByDate(date: Date): Appointment | null {
    const found = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return found || null;
  }

  /**
   * Create a new appointment
   */
  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
