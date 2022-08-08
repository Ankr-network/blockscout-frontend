import { History } from 'history';
import { PATH_CHAINS } from 'domains/chains/routes';

export type IsActive = (match: any, location: History['location']) => boolean;

export const isDashboardActive: IsActive = (
  match: any,
  location: History['location'],
) => {
  return match?.isExact || location.pathname.includes(PATH_CHAINS);
};
