import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  /**
   * Find a booked appointment to the same date
   */
  public async findByDate(date: Date): Promise<Appointment | null> {
    const found = await this.findOne({
      where: {
        date,
      },
    });
    return found || null;
  }
}

export default AppointmentsRepository;
