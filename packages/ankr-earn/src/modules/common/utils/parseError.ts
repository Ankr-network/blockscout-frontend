import { t } from 'common';

const USER_REJECT_ERROR_CODE = '4001';

export const getIsRejectedByUser = (error: string): boolean =>
  error.includes(USER_REJECT_ERROR_CODE);

export const parseError = (error: string): string => {
  if (getIsRejectedByUser(error)) {
    return t('error.user-rejected');
  }

  return error;
};
