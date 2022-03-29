import { useDialog } from 'modules/common/hooks/useDialog';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';

interface IUseSuccessDiaglog {
  isSuccessOpened: boolean;
  onSuccessOpen: () => void;
  onSuccessClose: () => void;
  onAddTokenClick: () => Promise<void>;
}

export const useSuccessDialog = (): IUseSuccessDiaglog => {
  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const onAddTokenClick = async () => {
    const sdk = await BinanceSDK.getInstance();
    return sdk.addABNBBToWallet();
  };

  return {
    isSuccessOpened,
    onSuccessOpen,
    onSuccessClose,
    onAddTokenClick,
  };
};
