import { t } from '@ankr.com/common';

import { AddEmailFormContentState } from '../AddEmailForm/types';

export const getTitle = (key: AddEmailFormContentState) => {
  switch (key) {
    case AddEmailFormContentState.ADD_EMAIL:
    case AddEmailFormContentState.CHANGE_EMAIL:
      return t('user-settings.email-banner.add-step.title');

    case AddEmailFormContentState.SUCCESS:
      return t('user-settings.email-banner.success-step.title');

    default:
      return '';
  }
};
