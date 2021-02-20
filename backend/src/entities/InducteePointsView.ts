import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { AppUser } from './AppUser';
import { Attendance } from './Attendance';
import { Event } from './Event';
import { EventsView } from './EventsView';

// later do some grouping by cycle
@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('appUser.id', 'user')
      .addSelect('appUser.email', 'email')
      .addSelect('SUM(attendance.points)', 'points')
      .addSelect(
        "SUM(CASE WHEN event.type = 'professional' THEN 1 ELSE 0 END)::int::bool",
        'hasProfessionalRequirement'
      )
      .addSelect(
        "SUM(CASE WHEN event.type = 'mentorship' THEN 1 ELSE 0 END)::int::bool",
        'hasMentorshipRequirement'
      )
      .addSelect('event_view.eventYear', 'eventYear')
      .from(AppUser, 'appUser')
      .innerJoin(Attendance, 'attendance', 'appUser.id = attendance.attendee')
      .innerJoin(Event, 'event', 'event.id = attendance.event')
      .innerJoin(EventsView, 'event_view', 'event.id = event_view.eventId')
      .groupBy('appUser.id, event_view.eventYear')
      .where('attendance.isInductee'),
})
export class InducteePointsView {
  @ViewColumn()
  user: number;

  @ViewColumn()
  email: string;

  @ViewColumn()
  points: number;

  @ViewColumn()
  hasProfessionalRequirement: boolean;

  @ViewColumn()
  hasMentorshipRequirement: boolean;

  @ViewColumn()
  eventYear: string;
}
