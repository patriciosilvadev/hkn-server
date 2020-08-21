/* tslint:disable */
/* eslint-disable */
/**
 * HKN API
 * HKN API
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import {
  AppUserEventRequest,
  AppUserEventRequestFromJSON,
  AppUserEventRequestToJSON,
  AttendanceResponse,
  AttendanceResponseFromJSON,
  AttendanceResponseToJSON,
  EventRequest,
  EventRequestFromJSON,
  EventRequestToJSON,
  EventResponse,
  EventResponseFromJSON,
  EventResponseToJSON,
  MultipleEventResponse,
  MultipleEventResponseFromJSON,
  MultipleEventResponseToJSON,
  RSVPResponse,
  RSVPResponseFromJSON,
  RSVPResponseToJSON,
} from '../models';

export interface EventControllerCreateEventRequest {
  eventRequest?: EventRequest;
}

export interface EventControllerDeleteEventRequest {
  eventID: number;
}

export interface EventControllerGetEventRequest {
  eventID: number;
}

export interface EventControllerRsvpForEventRequest {
  eventID: number;
  appUserEventRequest?: AppUserEventRequest;
}

export interface EventControllerSignInToEventRequest {
  eventID: number;
  appUserEventRequest?: AppUserEventRequest;
}

export interface EventControllerUpdateEventRequest {
  eventID: number;
  eventRequest?: EventRequest;
}

/**
 *
 */
export class EventApi extends runtime.BaseAPI {
  /**
   * Create event
   */
  async eventControllerCreateEventRaw(
    requestParameters: EventControllerCreateEventRequest
  ): Promise<runtime.ApiResponse<EventResponse>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request({
      path: `/api/events/`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: EventRequestToJSON(requestParameters.eventRequest),
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      EventResponseFromJSON(jsonValue)
    );
  }

  /**
   * Create event
   */
  async eventControllerCreateEvent(
    requestParameters: EventControllerCreateEventRequest
  ): Promise<EventResponse> {
    const response = await this.eventControllerCreateEventRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * Delete event
   */
  async eventControllerDeleteEventRaw(
    requestParameters: EventControllerDeleteEventRequest
  ): Promise<runtime.ApiResponse<EventResponse>> {
    if (
      requestParameters.eventID === null ||
      requestParameters.eventID === undefined
    ) {
      throw new runtime.RequiredError(
        'eventID',
        'Required parameter requestParameters.eventID was null or undefined when calling eventControllerDeleteEvent.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/api/events/{eventID}`.replace(
        `{${'eventID'}}`,
        encodeURIComponent(String(requestParameters.eventID))
      ),
      method: 'DELETE',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      EventResponseFromJSON(jsonValue)
    );
  }

  /**
   * Delete event
   */
  async eventControllerDeleteEvent(
    requestParameters: EventControllerDeleteEventRequest
  ): Promise<EventResponse> {
    const response = await this.eventControllerDeleteEventRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * Get event
   */
  async eventControllerGetEventRaw(
    requestParameters: EventControllerGetEventRequest
  ): Promise<runtime.ApiResponse<EventResponse>> {
    if (
      requestParameters.eventID === null ||
      requestParameters.eventID === undefined
    ) {
      throw new runtime.RequiredError(
        'eventID',
        'Required parameter requestParameters.eventID was null or undefined when calling eventControllerGetEvent.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/api/events/{eventID}`.replace(
        `{${'eventID'}}`,
        encodeURIComponent(String(requestParameters.eventID))
      ),
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      EventResponseFromJSON(jsonValue)
    );
  }

  /**
   * Get event
   */
  async eventControllerGetEvent(
    requestParameters: EventControllerGetEventRequest
  ): Promise<EventResponse> {
    const response = await this.eventControllerGetEventRaw(requestParameters);
    return await response.value();
  }

  /**
   * Get multiple events
   */
  async eventControllerGetMultipleEventsRaw(): Promise<
    runtime.ApiResponse<MultipleEventResponse>
  > {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/api/events/`,
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      MultipleEventResponseFromJSON(jsonValue)
    );
  }

  /**
   * Get multiple events
   */
  async eventControllerGetMultipleEvents(): Promise<MultipleEventResponse> {
    const response = await this.eventControllerGetMultipleEventsRaw();
    return await response.value();
  }

  /**
   * Rsvp for event
   */
  async eventControllerRsvpForEventRaw(
    requestParameters: EventControllerRsvpForEventRequest
  ): Promise<runtime.ApiResponse<RSVPResponse>> {
    if (
      requestParameters.eventID === null ||
      requestParameters.eventID === undefined
    ) {
      throw new runtime.RequiredError(
        'eventID',
        'Required parameter requestParameters.eventID was null or undefined when calling eventControllerRsvpForEvent.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request({
      path: `/api/events/{eventID}/rsvp`.replace(
        `{${'eventID'}}`,
        encodeURIComponent(String(requestParameters.eventID))
      ),
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: AppUserEventRequestToJSON(requestParameters.appUserEventRequest),
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      RSVPResponseFromJSON(jsonValue)
    );
  }

  /**
   * Rsvp for event
   */
  async eventControllerRsvpForEvent(
    requestParameters: EventControllerRsvpForEventRequest
  ): Promise<RSVPResponse> {
    const response = await this.eventControllerRsvpForEventRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * Sign in to event
   */
  async eventControllerSignInToEventRaw(
    requestParameters: EventControllerSignInToEventRequest
  ): Promise<runtime.ApiResponse<AttendanceResponse>> {
    if (
      requestParameters.eventID === null ||
      requestParameters.eventID === undefined
    ) {
      throw new runtime.RequiredError(
        'eventID',
        'Required parameter requestParameters.eventID was null or undefined when calling eventControllerSignInToEvent.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request({
      path: `/api/events/{eventID}/signin`.replace(
        `{${'eventID'}}`,
        encodeURIComponent(String(requestParameters.eventID))
      ),
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: AppUserEventRequestToJSON(requestParameters.appUserEventRequest),
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      AttendanceResponseFromJSON(jsonValue)
    );
  }

  /**
   * Sign in to event
   */
  async eventControllerSignInToEvent(
    requestParameters: EventControllerSignInToEventRequest
  ): Promise<AttendanceResponse> {
    const response = await this.eventControllerSignInToEventRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * Update event
   */
  async eventControllerUpdateEventRaw(
    requestParameters: EventControllerUpdateEventRequest
  ): Promise<runtime.ApiResponse<EventResponse>> {
    if (
      requestParameters.eventID === null ||
      requestParameters.eventID === undefined
    ) {
      throw new runtime.RequiredError(
        'eventID',
        'Required parameter requestParameters.eventID was null or undefined when calling eventControllerUpdateEvent.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request({
      path: `/api/events/{eventID}`.replace(
        `{${'eventID'}}`,
        encodeURIComponent(String(requestParameters.eventID))
      ),
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: EventRequestToJSON(requestParameters.eventRequest),
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      EventResponseFromJSON(jsonValue)
    );
  }

  /**
   * Update event
   */
  async eventControllerUpdateEvent(
    requestParameters: EventControllerUpdateEventRequest
  ): Promise<EventResponse> {
    const response = await this.eventControllerUpdateEventRaw(
      requestParameters
    );
    return await response.value();
  }
}
