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
 * @interface AppUserInductionClass
 */
export interface AppUserInductionClass {
    /**
     * 
     * @type {string}
     * @memberof AppUserInductionClass
     */
    quarter: string;
}

export function AppUserInductionClassFromJSON(json: any): AppUserInductionClass {
    return AppUserInductionClassFromJSONTyped(json, false);
}

export function AppUserInductionClassFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppUserInductionClass {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'quarter': json['quarter'],
    };
}

export function AppUserInductionClassToJSON(value?: AppUserInductionClass | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'quarter': value.quarter,
    };
}

