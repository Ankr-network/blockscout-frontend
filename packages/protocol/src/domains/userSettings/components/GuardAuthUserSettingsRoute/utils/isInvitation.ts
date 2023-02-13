import { RouteProps } from 'react-router';
import { isReactSnap } from 'modules/common/utils/isReactSnap';

import { QUERY_EMAIL } from 'domains/userSettings/const';
import { PATH_SETTINGS } from 'domains/userSettings/Routes';

const hasSearchEmailParam = (search = '') => {
  // because of the mention URLSearchParams we have a log with react-snap: react-intl-universal locales data "null" not exists
  return new URLSearchParams(search).get(QUERY_EMAIL);
};

export const isInvitation = (location: RouteProps['location']) => {
  const { pathname = '', search = '' } = location || {};

  const isSettingsPath =
    pathname.split('/').join('') === PATH_SETTINGS.split('/').join('');

  const hasEmailParam = isReactSnap ? false : hasSearchEmailParam(search);

  return isSettingsPath && hasEmailParam;
};
