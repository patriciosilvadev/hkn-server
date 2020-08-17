import { AppUserEventRequest, AppUserEventResponse } from '@Payloads';
import { AppUser } from '@Entities';
import { AppUserService } from '@Services';
import { AppUserRepositoryToken } from '@Repositories';

import { Repository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { singleton, inject } from 'tsyringe';

@singleton()
export class AppUserMapper {
  private appUserRepository: Repository<AppUser>;
  private appUserService: AppUserService;

  constructor(
    @inject(AppUserRepositoryToken) appUserRepository: Repository<AppUser>,
    @inject(AppUserService) appUserService: AppUserService
  ) {
    this.appUserRepository = appUserRepository;
    this.appUserService = appUserService;
  }

  /**
   * Converts an EventSignInRequest payload to an AppUser entity and
   * returns the newly created entity to the caller.
   *
   * @param appUserRequest The request payload from which the AppUser entity
   *                       is created.
   */
  requestToNewEntity(appUserRequest: AppUserEventRequest): AppUser {
    const plainAppUserRequest: Object = classToPlain(appUserRequest);
    return this.appUserRepository.create(plainAppUserRequest);
  }

  /**
   * Updates an existing AppUser entity with new data from the request payload.
   * If there is no AppUser entity with the passed-in appUserId, then return undefined.
   *
   * @param appUserRequest The request payload from which the updated existing AppUser
   *                       entity is created
   * @param appUserId The supposed ID of an existing AppUser entity.
   */
  async requestToExistingEntity(
    appUserRequest: AppUserEventRequest,
    appUserId: number
  ): Promise<AppUser | undefined> {
    const appUserObj: AppUser = appUserRequest as AppUser;
    appUserObj.id = appUserId;

    const appUser: AppUser = await this.appUserRepository.preload(appUserObj);

    return appUser;
  }

  async requestToEntityByEmail(appUserRequest: AppUserEventRequest): Promise<AppUser> {
    const { email } = appUserRequest;
    const appUserFromEmail = await this.appUserService.getAppUserByEmail(email);

    if (appUserFromEmail === undefined) {
      return this.requestToNewEntity(appUserRequest);
    } else {
      const { id } = appUserFromEmail;

      return await this.requestToExistingEntity(appUserRequest, id);
    }
  }

  /**
   * Converts an AppUser entity to an AppUserEventResponse payload and returns the
   * newly created response payload to the caller.
   *
   * @param appUser The AppUser entity to be converted to an AppUserEventResponse
   *                payload.
   */
  entityToResponse(appUser: AppUser): AppUserEventResponse {
    const plainAppUser: Object = classToPlain(appUser);
    const appUserResponse: AppUserEventResponse = plainToClass(AppUserEventResponse, plainAppUser);

    return appUserResponse;
  }
}
