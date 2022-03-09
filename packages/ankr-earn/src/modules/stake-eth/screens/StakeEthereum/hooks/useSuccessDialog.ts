import { useDialog } from 'modules/common/hooks/useDialog';

interface IUseSuccessDialog {
  isSuccessOpened: boolean;
  onSuccessOpen: () => void;
  onSuccessClose: () => void;
  onAddTokenClick: () => void;
}

export const useSuccessDialog = (): IUseSuccessDialog => {
  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const onAddTokenClick = () => {};

  return {
    isSuccessOpened,
    onSuccessOpen,
    onSuccessClose,
    onAddTokenClick,
  };
};
