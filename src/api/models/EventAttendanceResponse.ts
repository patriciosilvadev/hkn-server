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

import { exists, mapValues } from '../runtime';
/**
 *
 * @export
 * @interface EventAttendanceResponse
 */
export interface EventAttendanceResponse {
  /**
   *
   * @type {Array<any>}
   * @memberof EventAttendanceResponse
   */
  hosts: Array<any>;
  /**
   *
   * @type {string}
   * @memberof EventAttendanceResponse
   */
  status: EventAttendanceResponseStatusEnum;
  /**
   *
   * @type {string}
   * @memberof EventAttendanceResponse
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof EventAttendanceResponse
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof EventAttendanceResponse
   */
  location?: string;
  /**
   *
   * @type {string}
   * @memberof EventAttendanceResponse
   */
  startDate: string;
  /**
   *
   * @type {string}
   * @memberof EventAttendanceResponse
   */
  endDate: string;
  /**
   *
   * @type {string}
   * @memberof EventAttendanceResponse
   */
  type?: EventAttendanceResponseTypeEnum;
  /**
   *
   * @type {string}
   * @memberof EventAttendanceResponse
   */
  fbURL?: string;
  /**
   *
   * @type {string}
   * @memberof EventAttendanceResponse
   */
  canvaURL?: string;
}

export function EventAttendanceResponseFromJSON(
  json: any
): EventAttendanceResponse {
  return EventAttendanceResponseFromJSONTyped(json, false);
}

export function EventAttendanceResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EventAttendanceResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    hosts: json['hosts'],
    status: json['status'],
    name: json['name'],
    description: json['description'],
    location: !exists(json, 'location') ? undefined : json['location'],
    startDate: json['startDate'],
    endDate: json['endDate'],
    type: !exists(json, 'type') ? undefined : json['type'],
    fbURL: !exists(json, 'fbURL') ? undefined : json['fbURL'],
    canvaURL: !exists(json, 'canvaURL') ? undefined : json['canvaURL'],
  };
}

export function EventAttendanceResponseToJSON(
  value?: EventAttendanceResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    hosts: value.hosts,
    status: value.status,
    name: value.name,
    description: value.description,
    location: value.location,
    startDate: value.startDate,
    endDate: value.endDate,
    type: value.type,
    fbURL: value.fbURL,
    canvaURL: value.canvaURL,
  };
}

/**
 * @export
 * @enum {string}
 */
export enum EventAttendanceResponseStatusEnum {
  Pending = 'pending',
  Ready = 'ready',
  Complete = 'complete',
}
/**
 * @export
 * @enum {string}
 */
export enum EventAttendanceResponseTypeEnum {
  Professional = 'professional',
  Social = 'social',
  Technical = 'technical',
  Mentorship = 'mentorship',
}
