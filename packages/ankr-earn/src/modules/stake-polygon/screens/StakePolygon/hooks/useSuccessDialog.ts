import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { PolygonSDK } from 'modules/stake-polygon/api/PolygonSDK';

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
    token: Token.aMATICb,
  };
};
