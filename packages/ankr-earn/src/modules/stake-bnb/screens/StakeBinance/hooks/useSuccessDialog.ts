import { useDialog } from 'modules/common/hooks/useDialog';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
import { AvailableTokens } from 'modules/trading-cockpit/types';

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
    token: AvailableTokens.aBNBb,
  };
};
