import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { TwoFAControlDialogView } from './TwoFAControlDialogTypes';
import { USER_SETTINGS_INTL_ROOT } from '../../constants';

export const useTitle = (view: TwoFAControlDialogView) =>
  useMemo(() => {
    switch (view) {
      case TwoFAControlDialogView.Success:
        return t(`${USER_SETTINGS_INTL_ROOT}.control-dialog.success.title`);

      case TwoFAControlDialogView.Error:
        return t(`${USER_SETTINGS_INTL_ROOT}.control-dialog.error.title`);

      case TwoFAControlDialogView.Default:
      default:
        return t(`${USER_SETTINGS_INTL_ROOT}.enter-code-dialog.title`);
    }
  }, [view]);
