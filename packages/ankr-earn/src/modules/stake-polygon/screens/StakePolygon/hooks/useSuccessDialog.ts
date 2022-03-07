import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { PolygonSDK } from 'modules/stake-polygon/api/PolygonSDK';

interface IUseSuccessDialog {
  isSuccessOpened: boolean;
  token: Token;
  onSuccessClose: () => void;
  onSuccessOpen: () => void;
  onAddTokenClick: () => Promise<void>;
}

export const useSuccessDialog = (): IUseSuccessDialog => {
  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const onAddTokenClick = async () => {
    const sdk = await PolygonSDK.getInstance();
    return sdk.addAmaticbToWallet();
  };

  return {
    isSuccessOpened,
    token: Token.aMATICb,
    onSuccessClose,
    onSuccessOpen,
    onAddTokenClick,
  };
};
