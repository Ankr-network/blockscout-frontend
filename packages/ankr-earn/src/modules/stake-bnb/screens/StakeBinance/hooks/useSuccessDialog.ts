import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';

export const useSuccessDialog = () => {
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
    onSuccessOpen,
    onSuccessClose,
    isSuccessOpened,
    onAddTokenClick,
    token: Token.aBNBb,
  };
};
