import { JsonController, Param, Get, Post, Delete, Body, OnUndefined } from 'routing-controllers';
import { singleton, inject } from 'tsyringe';
import { ResponseSchema } from 'routing-controllers-openapi';

import { Event, Attendance } from '@Entities';
import { EventRequest, EventResponse, MultipleEventResponse, EventSignInRequest } from '@Payloads';
import { AppUserService, EventService } from '@Services';
import { AppUserMapper, EventMapper } from '@Mappers';

@singleton()
@JsonController('/api/events')
export class EventController {
  private appUserService: AppUserService;
  private appUserMapper: AppUserMapper;
  private eventService: EventService;
  private eventMapper: EventMapper;

  constructor(
    @inject(AppUserService) appUserService: AppUserService,
    @inject(AppUserMapper) appUserMapper: AppUserMapper,
    @inject(EventService) eventService: EventService,
    @inject(EventMapper) eventMapper: EventMapper
  ) {
    this.appUserService = appUserService;
    this.appUserMapper = appUserMapper;
    this.eventService = eventService;
    this.eventMapper = eventMapper;
  }

  @Post('/')
  @ResponseSchema(EventResponse)
  async createEvent(@Body() eventRequest: EventRequest): Promise<EventResponse> {
    const event = this.eventMapper.requestToNewEntity(eventRequest);
    const savedEvent = await this.eventService.saveEvent(event);
    return this.eventMapper.entityToResponse(savedEvent);
  }

  @Get('/')
  @ResponseSchema(MultipleEventResponse)
  async getMultipleEvents(): Promise<MultipleEventResponse> {
    const events: Event[] = await this.eventService.getAllEvents();
    const eventResponses = events.map(event => this.eventMapper.entityToResponse(event));

    const multipleEventResponse = new MultipleEventResponse();
    multipleEventResponse.events = eventResponses;
    return multipleEventResponse;
  }

  @Get('/:eventID')
  @ResponseSchema(EventResponse)
  async getEvent(@Param('eventID') eventID: number): Promise<EventResponse> {
    const event = await this.eventService.getEventById(eventID);
    if (event === undefined) {
      return undefined;
    }
    return this.eventMapper.entityToResponse(event);
  }

  @Post('/:eventID')
  @ResponseSchema(EventResponse)
  async updateEvent(
    @Param('eventID') id: number,
    @Body() eventRequest: EventRequest
  ): Promise<EventResponse> {
    const event = await this.eventMapper.requestToExistingEntity(eventRequest, id);
    if (event === undefined) {
      return undefined;
    }

    const savedEvent = await this.eventService.saveEvent(event);
    return this.eventMapper.entityToResponse(savedEvent);
  }

  @Delete('/:eventID')
  @ResponseSchema(EventResponse)
  async deleteEvent(@Param('eventID') eventID: number): Promise<EventResponse> {
    const deletedEvent = await this.eventService.deleteEvent(eventID);
    if (deletedEvent === undefined) {
      return undefined;
    }

    return this.eventMapper.entityToResponse(deletedEvent);
  }

  @Post('/:eventID/signin')
  @OnUndefined(409)
  @ResponseSchema(Attendance)
  async signInToEvent(
    @Param('eventID') eventID: number,
    @Body() appUserRequest: EventSignInRequest
  ): Promise<Attendance | undefined> {
    const appUserToSave = await this.appUserMapper.requestToEntityByEmail(appUserRequest);
    const savedAppUser = await this.appUserService.saveNonAffiliate(appUserToSave);

    if (savedAppUser === undefined) {
      /*
       * TODO: Handle the case where user is an affiliate
       * If affiliated user has a token, then verify it and proceed. If said
       * user does not have a token, then send back an HTTP error.
       */
    }

    return await this.eventService.registerForEventAttendance(eventID, savedAppUser);
  }
}
