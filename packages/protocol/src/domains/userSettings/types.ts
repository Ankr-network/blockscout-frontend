import { AccountingErrorResponse, GroupUserRole } from 'multirpc-sdk';
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

export const TELEGRAM_CONFIRMATION_DATA_PARAM_NAME = 'confirmation_data';

export interface TeamInvitationQueryParams {
  [TeamInvitationQueryParamsName.Email]: string;
  [TeamInvitationQueryParamsName.ExpiresAt]: string;
  [TeamInvitationQueryParamsName.Gname]: string;
  [TeamInvitationQueryParamsName.Group]: string;
  [TeamInvitationQueryParamsName.Role]: GroupUserRole;
  [TeamInvitationQueryParamsName.Token]: string;
}

export enum ESettingsContentType {
  General = 'general',
  Teams = 'teams',
}

export const SETTINGS_QUERY_KEY = 'type';

export type SettingsRouteQueryParams = {
  [SETTINGS_QUERY_KEY]: ESettingsContentType;
};
