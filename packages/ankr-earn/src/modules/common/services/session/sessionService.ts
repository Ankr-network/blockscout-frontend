import { ISessionService } from './interface';

export class SessionService implements ISessionService {
  public setItem(key: string, value: unknown): void {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): string | null {
    const value = window.sessionStorage.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }

  public removeItem(key: string): void {
    window.sessionStorage.removeItem(key);
  }
}

export const sessionServiceInstance = new SessionService();
