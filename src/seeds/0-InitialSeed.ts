import {
  AppUser,
  Event,
  EventType,
  EventStatus,
  Attendance,
  RSVP,
  InductionClass,
} from '@Entities';
import { MigrationInterface, QueryRunner, EntityManager } from 'typeorm';

const appUsers = [
  {
    firstName: 'Olivia',
    lastName: 'Olsen',
    email: 'officer@ucsd.edu',
    major: 'Computer Science',
    graduationYear: '2020',
    role: 'officer',
  },
  {
    firstName: 'Mac',
    lastName: 'Miller',
    email: 'member@ucsd.edu',
    major: 'Computer Science',
    graduationYear: '2021',
    role: 'member',
  },
  {
    firstName: 'Irene',
    lastName: 'Iverson',
    email: 'inductee@ucsd.edu',
    major: 'Computer Science',
    graduationYear: '2022',
    role: 'inductee',
  },
];

const inductionClass = {
  quarter: 'FA20',
  name: 'Alpha Beta',
  startDate: '2020-08-30',
  endDate: '2020-12-30',
};

const events = [
  {
    name: 'Laser Tag',
    description: 'We have free pizza!',
    location: 'In n Out',
    startDate: '2020-08-30T18:00:00+00:00',
    endDate: '2020-08-30T19:00:00+00:00',
    type: EventType.SOCIAL,
    status: EventStatus.PENDING,
    hosts: [{ id: 1 }], // hardcoded to assume officer is id 1
  },
];

const attendances = [
  {
    attendee: { id: 3 },
    officer: { id: 1 },
    event: { id: 1 },
    duration: 1,
    isInductee: true,
  },
];

const rsvps = [
  {
    event: { id: 1 },
    appUser: { id: 2 },
  },
];

export class InitialSeed1598821691476 implements MigrationInterface {
  name = 'InitialSeed1598821691476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager: EntityManager = queryRunner.manager;

    // InductionClass
    const inductionClassEntity: InductionClass = manager.create(InductionClass, inductionClass);
    await manager.insert(InductionClass, inductionClassEntity);

    // AppUsers
    const appUserPromises = appUsers.map(appUser => {
      const appUserEntity: AppUser = manager.create(AppUser, appUser);
      appUserEntity.inductionClass = inductionClassEntity;
      return manager.insert(AppUser, appUserEntity);
    });
    await Promise.all(appUserPromises);

    // Events
    const eventPromises = events.map(async event => {
      const eventEntity: Event = manager.create(Event, event);
      return manager.insert(Event, eventEntity);
    });
    await Promise.all(eventPromises);

    // Attendance
    const attendancePromises = attendances.map(async attendance =>
      manager.insert(Attendance, attendance)
    );
    await Promise.all(attendancePromises);

    // RSVP
    const rsvpPromises = rsvps.map(async rsvp => manager.insert(RSVP, rsvp));
    await Promise.all(rsvpPromises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from attendance`);
    await queryRunner.query(`DELETE from rsvp`);
    await queryRunner.query(`DELETE from event_hosts_app_user`);
    await queryRunner.query(`DELETE from app_user`);
    await queryRunner.query(`DELETE from induction_class`);
  }
}