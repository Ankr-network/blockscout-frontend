import { useDialog } from 'modules/common/hooks/useDialog';
import { PolygonSDK } from 'modules/stake-polygon/api/PolygonSDK';
import { AvailableTokens } from 'modules/trading-cockpit/types';

export const useSuccessDialog = () => {
  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const onAddTokenClick = async () => {
    const sdk = await PolygonSDK.getInstance();
    return await sdk.addAmaticbToWallet();
  };

  return {
    onSuccessOpen,
    onSuccessClose,
    isSuccessOpened,
    onAddTokenClick,
    token: AvailableTokens.aMATICb,
  };
};
