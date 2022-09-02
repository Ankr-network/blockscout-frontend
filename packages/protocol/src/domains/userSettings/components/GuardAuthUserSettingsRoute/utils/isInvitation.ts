import { RouteProps } from 'react-router';

import { PATH_SETTINGS } from 'domains/userSettings/Routes';
import { QUERY_EMAIL } from 'domains/userSettings/const';

export const isInvitation = ({ location }: RouteProps) => {
  const { pathname = '', search = '' } = location || {};

  const isSettingsPath =
    pathname.replaceAll('/', '') === PATH_SETTINGS.replaceAll('/', '');

  const hasEmailParam = !!new URLSearchParams(search).get(QUERY_EMAIL);

  return isSettingsPath && hasEmailParam;
};
