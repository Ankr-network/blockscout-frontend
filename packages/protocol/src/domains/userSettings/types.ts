import { AccountingErrorResponse } from 'multirpc-sdk';
import { AxiosError } from 'axios';

export type ErrorMessageGetter = (
  error: AxiosError<AccountingErrorResponse>,
  email?: string,
) => string;

export enum UserSettingsBanners {
  ADD_EMAIl = 'ADD_EMAIL',
}

export enum TeamInvitationQueryParamsName {
  Group = 'group',
  Email = 'email',
  Token = 'token',
  Role = 'role',
  Gname = 'gname',
  ExpiresAt = 'expires_at',
}

export type TeamInvitationQueryParams = Record<
  TeamInvitationQueryParamsName,
  string
>;

export enum ESettingsContentType {
  General = 'general',
  Teams = 'teams',
}

export const SETTINGS_QUERY_KEY = 'type';

export type SettingsRouteQueryParams = {
  [SETTINGS_QUERY_KEY]: ESettingsContentType;
};
