import { Entity, ManyToOne } from 'typeorm';
import { AppUser } from './AppUser';
import { Event } from './Event';

@Entity()
export class RSVP {
  @ManyToOne(
    () => Event,
    event => event.rsvps,
    { primary: true }
  )
  event: Event;

  @ManyToOne(() => AppUser, { primary: true })
  appUser: AppUser;
}
