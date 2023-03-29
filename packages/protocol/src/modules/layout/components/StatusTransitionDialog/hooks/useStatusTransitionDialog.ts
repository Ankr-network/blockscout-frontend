import { useHistory } from 'react-router';
import { useEffect, useMemo } from 'react';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { PostTopUpLocationState } from '../types';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';

const { cardPaymentSuccess, topUp } = AccountRoutesConfig;

export const useStatusTransitionDialog = () => {
  const { hasFreeToPremiumTransition } = useAuth();
  const {
    location: { state },
  } = useHistory<PostTopUpLocationState>();
  const origin = state?.origin;

  const shouldShowDialog = useMemo(() => {
    const isRedirectedFromSuccessTopUp =
      origin === cardPaymentSuccess.path || origin === topUp.path;

    return hasFreeToPremiumTransition && isRedirectedFromSuccessTopUp;
  }, [hasFreeToPremiumTransition, origin]);

  const { isOpened, onClose, onOpen } = useDialog(shouldShowDialog);

  useEffect(() => {
    if (shouldShowDialog) {
      onOpen();
    }
  }, [onOpen, shouldShowDialog]);

  return { isOpened, onClose, onOpen };
};
