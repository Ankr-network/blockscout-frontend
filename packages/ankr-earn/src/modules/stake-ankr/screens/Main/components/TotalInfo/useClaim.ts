import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { useCallback } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { claimAllRewards } from 'modules/stake-ankr/actions/claimAllRewards';
import { getTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { IStakingReward } from 'modules/stake-ankr/api/AnkrStakingSDK/types';

interface IUseClaim {
  availableClaims?: IStakingReward[];
  isClaimAllowed: boolean;
  isClaimLoading: boolean;
  isOpened: boolean;
  usdTokenPrice?: number;
  onClose: () => void;
  onOpen: () => void;
  onClaim: () => void;
}

export const useClaim = (): IUseClaim => {
  const dispatchRequest = useDispatchRequest();
  const { loading: isClaimLoading } = useMutation({ type: claimAllRewards });
  const { data } = useQuery({
    type: getTotalInfo,
  });

  const { isOpened, onClose, onOpen } = useDialog();

  const availableClaims = data?.claimableRewards;

  const isClaimAllowed = !!availableClaims?.length;

  const usdTokenPrice = 0;

  const onClaim = useCallback(() => {
    dispatchRequest(claimAllRewards()).then(({ error }) => {
      if (!error) onClose();
    });
  }, [dispatchRequest, onClose]);

  return {
    isClaimAllowed,
    isOpened,
    isClaimLoading,
    availableClaims,
    usdTokenPrice,
    onClose,
    onOpen,
    onClaim,
  };
};
