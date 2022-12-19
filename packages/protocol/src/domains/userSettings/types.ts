import { AccountErrorResponse } from 'multirpc-sdk';
import { AxiosError } from 'axios';

export type ErrorMessageGetter = (
  error: AxiosError<AccountErrorResponse>,
  email?: string,
) => string;

export enum UserSettingsBanners {
  ADD_EMAIl = 'ADD_EMAIL',
}
