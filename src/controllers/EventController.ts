import { JsonController, Param, Get, Post, Delete, Body } from 'routing-controllers';
import { injectable, inject } from 'tsyringe';
import { ResponseSchema } from 'routing-controllers-openapi';

import { EventRequest, EventResponse, MultipleEventResponse } from '@Payloads';
import { Event } from '@Entities';
import { EventServiceInterface, EventServiceInterfaceToken } from '@Services/Interfaces';

@injectable()
@JsonController('/api/event')
export class EventController {
  private eventService: EventServiceInterface;

  constructor(@inject(EventServiceInterfaceToken) eventService: EventServiceInterface) {
    this.eventService = eventService;
  }

  @Post('/')
  @ResponseSchema(EventResponse)
  createEvent(@Body() event: EventRequest): Promise<EventResponse> {
    return this.eventService.createEvent(event);
  }

  @Get('/')
  @ResponseSchema(MultipleEventResponse)
  async getMultipleEvents(): Promise<MultipleEventResponse> {
    const events: Event[] = await this.eventService.getAllEvents();
    const eventResponses: EventResponse[] = events as EventResponse[];

    const multipleEventResponse = new MultipleEventResponse();
    multipleEventResponse.events = eventResponses;
    return multipleEventResponse;
  }

  @Get('/:id')
  @ResponseSchema(EventResponse)
  getEvent(@Param('id') id: number): Promise<EventResponse> {
    return this.eventService.getEventById(id);
  }

  @Post('/:id')
  @ResponseSchema(EventResponse)
  updateEvent(@Param('id') id: number, @Body() event: EventRequest): Promise<EventResponse> {
    return this.eventService.updateEvent(id, event);
  }

  @Delete('/:id')
  @ResponseSchema(EventResponse)
  deleteEvent(@Param('id') id: number): Promise<EventResponse> {
    return this.eventService.deleteEvent(id);
  }
}