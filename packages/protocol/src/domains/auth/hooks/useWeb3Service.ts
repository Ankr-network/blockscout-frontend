import { useCallback } from 'react';

import { INJECTED_WALLET_ID } from 'modules/api/MultiService';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';

import {
  createWeb3Service,
  selectHasWeb3Service,
  selectIsWeb3ServiceCreating,
} from '../actions/connect/createWeb3Service';
import { hasMetamask } from '../utils/hasMetamask';

export const useWeb3Service = () => {
  const hasWeb3Service = useAppSelector(selectHasWeb3Service);
  const isWeb3ServiceCreating = useAppSelector(selectIsWeb3ServiceCreating);

  const dispatch = useAppDispatch();

  const handleCreateWeb3Service = useCallback(async () => {
    if (!hasWeb3Service && hasMetamask()) {
      await dispatch(
        createWeb3Service.initiate({
          params: { walletId: INJECTED_WALLET_ID },
        }),
      );
    }
  }, [dispatch, hasWeb3Service]);

  return { handleCreateWeb3Service, hasWeb3Service, isWeb3ServiceCreating };
};
