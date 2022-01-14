import { useDialog } from 'modules/common/hooks/useDialog';
import { AvailableTokens } from 'modules/trading-cockpit/types';

export const useSuccessDialog = () => {
  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  // todo: add Token on Click
  const onAddTokenClick = () => null;

  return {
    onAddTokenClick,
    onSuccessOpen,
    onSuccessClose,
    isSuccessOpened,
    token: AvailableTokens.aMATICb,
  };
};
