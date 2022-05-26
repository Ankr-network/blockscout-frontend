import { useCallback } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';

import { AvalancheSDK } from '../../../api/AvalancheSDK';

interface IUseSuccessDiaglog {
  isSuccessOpened: boolean;
  token: Token;
  onAddTokenClick: () => Promise<boolean>;
  onSuccessClose: () => void;
  onSuccessOpen: () => void;
}

export const useSuccessDialog = (): IUseSuccessDiaglog => {
  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const onAddTokenClick = useCallback(async () => {
    const sdk = await AvalancheSDK.getInstance();

    return sdk.addTokenToWallet(Token.aAVAXb);
  }, []);

  return {
    isSuccessOpened,
    token: Token.aAVAXb,
    onAddTokenClick,
    onSuccessClose,
    onSuccessOpen,
  };
};
