import { AppUser, AppUserRole } from '@Entities';
import { singleton } from 'tsyringe';
import { Any, Repository, getRepository } from 'typeorm';

@singleton()
export class AppUserService {
  private appUserRepository: Repository<AppUser>;

  constructor() {
    this.appUserRepository = getRepository(AppUser);
  }

  /**
   * Stores the AppUser passed in as a parameter to the
   * AppUser table.
   *
   * @param {AppUser} appUser The AppUser to be stored to the db.
   * @returns {Promise} The saved AppUser entity.
   */
  async saveAppUser(appUser: AppUser): Promise<AppUser> {
    return await this.appUserRepository.save(appUser);
  }

  /**
   * Get multiple app users.
   *
   * @param {number[]} ids Array of ids of AppUsers to find.
   * @returns {AppUser[]} Array of AppUser entities.
   */
  getMultipleAppUsers(ids: number[]): Promise<AppUser[]> {
    return this.appUserRepository.find({ id: Any(ids) });
  }

  /**
   * Get an existing AppUser by their email address.
   *
   * @param {string} email The email used to look for the corresponding AppUser.
   * @returns {Promise} An AppUser entity if it exists in AppUser table.
   */
  getAppUserByEmail(email: string): Promise<AppUser | undefined> {
    return this.appUserRepository.findOne({ email });
  }

  /**
   * Save a non-affiliate as an AppUser in the DB (will not save affiliate
   * AppUser entities).
   *
   * @param {AppUser} appUser The AppUser to be saved if they are a non-affiliate.
   * @returns {Promise} The saved AppUser entity that is a non-affiliate.
   */
  async saveNonAffiliate(appUser: AppUser): Promise<AppUser | undefined> {
    const { role } = appUser;

    if (role !== undefined && role !== AppUserRole.GUEST) {
      return undefined;
    }

    return await this.saveAppUser(appUser);
  }
}
