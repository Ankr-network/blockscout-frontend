import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { useCallback } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { claimAll } from 'modules/stake-ankr/actions/claimAll';
import { getTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { IStakingReward } from 'modules/stake-ankr/api/AnkrStakingSDK/types';

interface IUseTotalInfo {
  availableClaims?: IStakingReward[];
  isClaimAllowed: boolean;
  isClaimLoading: boolean;
  isOpened: boolean;
  usdTokenPrice?: number;
  onClose: () => void;
  onOpen: () => void;
  onClaim: () => void;
}

export const useClaim = (): IUseTotalInfo => {
  const dispatchRequest = useDispatchRequest();
  const { loading: isClaimLoading } = useMutation({ type: claimAll });
  const { data } = useQuery({
    type: getTotalInfo,
  });

  const { isOpened, onClose, onOpen } = useDialog();

  const availableClaims = data?.claimableRewards;

  const isClaimAllowed = !!availableClaims?.length;

  const usdTokenPrice = 0.1;

  const onClaim = useCallback(() => {
    dispatchRequest(claimAll()).then(({ error }) => {
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
