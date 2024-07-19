import { useCallback, useMemo } from 'react';

import { trackSignUpModalClose } from 'modules/analytics/mixpanel/trackSignUpModalClose';

import { ContentType } from '../types';
import { checkContactSalesPopup } from '../utils/checkContactSalesPopup';
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
  const {
    contentType,
    setContactSalesSuccess: onSubmitContactForm,
    setDefault,
  } = useContentType({ defaultState });
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
    onSubmitContactForm,
  });

  const isContactSalesPopup = useMemo(
    () => checkContactSalesPopup({ contentType, defaultState }),
    [contentType, defaultState],
  );

  return { dialogProps, isContactSalesPopup };
};
