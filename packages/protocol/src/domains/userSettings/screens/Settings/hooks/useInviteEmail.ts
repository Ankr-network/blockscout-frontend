import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { QUERY_EMAIL } from 'domains/userSettings/const';
import { isValidEmail } from 'modules/common/utils/isValidEmail';
import { t } from 'modules/i18n/utils/intl';
import { useLinkParams } from 'domains/userSettings/hooks/useLinkParams';
import { useQueryParamsCleaner } from 'modules/common/hooks/useQueryParamCleaner';

export const useInviteEmail = (): [string | undefined, boolean, () => void] => {
  const { email } = useLinkParams();

  const isValid = isValidEmail(email || '');

  const dispatch = useDispatch();

  const cleanParams = useQueryParamsCleaner();

  const resetEmail = useCallback(() => {
    cleanParams(QUERY_EMAIL);
  }, [cleanParams]);

  useEffect(() => {
    if (email && !isValid) {
      dispatch(
        NotificationActions.showNotification({
          message: t('user-settings.errors.invalid-email', { email }),
          severity: 'error',
        }),
      );
    }
  }, [dispatch, email, isValid]);

  return [email || undefined, isValid, resetEmail];
};
