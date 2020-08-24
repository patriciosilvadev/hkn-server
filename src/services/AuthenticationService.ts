import admin from 'firebase-admin';

import { AppUserService, AppUserServiceImpl } from './AppUserService';
import { AppUser } from '@Entities';
import { config } from '../config';

export class AuthenticationService {
  constructor(private appUserService: AppUserService) {}

  async firebaseVerifyIdToken(token: string): Promise<AppUser | undefined> {
    try {
      const tokenResult = await admin.auth().verifyIdToken(token);

      if (tokenResult != null) {
        return undefined;
      }

      const {
        claims: { user_id },
      } = tokenResult;

      return await this.appUserService.getAppUserById(user_id);
    } catch {
      return undefined;
    }
  }

  async localVerifyIdToken(token: string): Promise<AppUser | undefined> {
    const id = parseInt(token, 10);

    if (isNaN(id)) {
      return undefined;
    }

    return await this.appUserService.getAppUserById(id);
  }

  async verifyToken(token: string): Promise<AppUser | undefined> {
    const { devAuth } = config;

    if (devAuth === 'development') {
      // Inject local token resolution function?
      return await this.localVerifyIdToken(token);
    }

    if (devAuth === 'production') {
      // Inject production token resolution functinon?
      return await this.firebaseVerifyIdToken(token);
    }

    return undefined;
  }
}

export const AuthenticationServiceImpl = new AuthenticationService(AppUserServiceImpl);