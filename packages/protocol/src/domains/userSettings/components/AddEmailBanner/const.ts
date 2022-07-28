import { t } from 'common';
import { AddEmailFormContentState } from '../AddEmailForm/types';

export const stateToTitle: Record<AddEmailFormContentState, string> = {
  [AddEmailFormContentState.ADD_EMAIL]: t(
    'user-settings.email-banner.add-step.title',
  ),
  [AddEmailFormContentState.CHANGE_EMAIL]: t(
    'user-settings.email-banner.add-step.title',
  ),
  [AddEmailFormContentState.SUCCESS]: t(
    'user-settings.email-banner.success-step.title',
  ),
};
