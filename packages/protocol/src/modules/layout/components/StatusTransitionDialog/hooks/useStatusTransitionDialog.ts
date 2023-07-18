import { useHistory } from 'react-router';
import { useCallback, useEffect, useMemo } from 'react';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { PostTopUpLocationState } from '../types';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';

const { cardPaymentSuccess, topUp } = AccountRoutesConfig;

export const useStatusTransitionDialog = () => {
  const { hasFreeToPremiumTransition } = useAuth();
  const history = useHistory<PostTopUpLocationState>();
  const origin = history?.location?.state?.origin;

  const hasStatusAccess = useGuardUserGroup({
    blockName: BlockWithPermission.AccountStatus,
  });

  const shouldShowDialog = useMemo(() => {
    const isRedirectedFromSuccessTopUp =
      origin === cardPaymentSuccess.path || origin === topUp.path;

    return (
      hasFreeToPremiumTransition &&
      isRedirectedFromSuccessTopUp &&
      hasStatusAccess
    );
  }, [hasFreeToPremiumTransition, origin, hasStatusAccess]);

  const { isOpened, onClose, onOpen } = useDialog(shouldShowDialog);

  const handleClose = useCallback(() => {
    history.replace(history?.location?.pathname, {});
    onClose();
  }, [onClose, history]);

  useEffect(() => {
    if (shouldShowDialog) {
      onOpen();
    }
  }, [onOpen, shouldShowDialog]);

  return { isOpened, onClose: handleClose, onOpen };
};
