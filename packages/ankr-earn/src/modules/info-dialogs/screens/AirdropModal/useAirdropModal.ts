import { useCallback, useState } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import {
  sessionServiceInstance,
  SessionServiceKeys,
} from 'modules/common/services';
import { Token } from 'modules/common/types/token';
import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';

interface IUseAirdropModal {
  isActive: boolean;
  isConnected: boolean;
  isAddTokenLoading: boolean;
  handleClose: () => void;
  handleAddToken: () => void;
}

export const useAirdropModal = (): IUseAirdropModal => {
  const [addBNBTokenToWallet, { isLoading: isAddTokenLoading }] =
    useAddBNBTokenToWalletMutation();
  const { isConnected } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const isBannerHidden = sessionServiceInstance.getItem(
    SessionServiceKeys.IS_AIRDROP_MODAL_HIDDEN,
  );

  const [isActive, setActive] = useState(!isBannerHidden);

  const handleClose = useCallback(() => {
    sessionServiceInstance.setItem(
      SessionServiceKeys.IS_AIRDROP_MODAL_HIDDEN,
      true,
    );
    setActive(false);
  }, []);

  const handleAddToken = useCallback(() => {
    addBNBTokenToWallet(Token.aBNBc);
  }, [addBNBTokenToWallet]);

  return {
    isActive,
    isAddTokenLoading,
    isConnected,
    handleAddToken,
    handleClose,
  };
};
