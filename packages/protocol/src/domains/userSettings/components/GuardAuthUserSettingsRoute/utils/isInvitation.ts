/* eslint-disable no-console */
import { RouteProps } from 'react-router';

import { QUERY_EMAIL } from 'domains/userSettings/const';
import { PATH_SETTINGS } from 'domains/userSettings/Routes';

export const isInvitation = ({ location }: RouteProps) => {
  const { pathname = '', search = '' } = location || {};

  const isSettingsPath =
    pathname.split('/').join('') === PATH_SETTINGS.split('/').join('');

  const hasEmailParam = !!new URLSearchParams(search).get(QUERY_EMAIL);

  return isSettingsPath && hasEmailParam;
};
