import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';

interface IUseSuccessDiaglog {
  isSuccessOpened: boolean;
  token: Token;
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
    token: Token.aBNBb,
    onSuccessOpen,
    onSuccessClose,
    onAddTokenClick,
  };
};
