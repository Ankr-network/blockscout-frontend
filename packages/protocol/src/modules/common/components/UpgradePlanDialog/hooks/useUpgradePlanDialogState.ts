import { useCallback } from 'react';

import { trackSignUpModalClose } from 'modules/analytics/mixpanel/trackSignUpModalClose';

import { ContentType } from '../types';
import { useContentType } from './useContentType';
import { useDialogProps } from './useDialogProps';

export interface UpgradePlanDialogStateParams {
  defaultState: ContentType;
  onClose: () => void;
}

export const useUpgradePlanDialogState = ({
  defaultState,
  onClose: handleClose,
}: UpgradePlanDialogStateParams) => {
  const { contentType, setDefault } = useContentType({ defaultState });
  const isSignUp = contentType === ContentType.SIGN_UP;

  const onClose = useCallback(() => {
    handleClose();
    setDefault();

    if (isSignUp) {
      trackSignUpModalClose();
    }
  }, [isSignUp, setDefault, handleClose]);

  const dialogProps = useDialogProps({
    contentType,
    onClose,
  });

  return { dialogProps };
};
