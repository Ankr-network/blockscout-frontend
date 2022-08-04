import { useDialog } from 'modules/common/hooks/useDialog';

interface IUseClaim {
  availableClaims?: [];
  isClaimAllowed: boolean;
  isClaimLoading: boolean;
  isOpened: boolean;
  usdTokenPrice?: number;
  onClose: () => void;
  onOpen: () => void;
  onClaim: () => void;
}

export const useClaim = (): IUseClaim => {
  const { isOpened, onClose, onOpen } = useDialog();

  return {
    isClaimAllowed: false,
    isOpened,
    isClaimLoading: false,
    availableClaims: [],
    usdTokenPrice: 0,
    onClose,
    onOpen,
    onClaim: () => {},
  };
};
