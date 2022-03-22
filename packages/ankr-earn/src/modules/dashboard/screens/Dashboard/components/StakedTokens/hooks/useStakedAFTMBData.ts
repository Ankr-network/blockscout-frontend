import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { featuresConfig, FTM_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { addFTMTokenToWallet } from 'modules/stake-fantom/actions/addFTMTokenToWallet';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { stake } from 'modules/stake-fantom/actions/stake';
import { unstake } from 'modules/stake-fantom/actions/unstake';
import { RoutesConfig } from 'modules/stake-fantom/Routes';

export interface IStakedAFTMBData {
  amount: BigNumber;
  pendingUnstakes: BigNumber;
  network: string;
  tradeLink: string;
  stakeLink: string;
  unstakeLink?: string;
  isShowed: boolean;
  isBalancesLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  handleAddTokenToWallet: () => void;
}

export const useStakedAFTMBData = (): IStakedAFTMBData => {
  const dispatchRequest = useDispatchRequest();

  const { data: commonData, loading: isBalancesLoading } = useQuery({
    type: getCommonData,
  });

  const { loading: isStakeLoading } = useMutation({
    type: stake,
  });

  const { loading: isUnstakeLoading } = useMutation({
    type: unstake,
  });

  const network = t(`chain.${FTM_NETWORK_BY_ENV}`);

  const amount = commonData?.aFTMbBalance ?? ZERO;
  const pendingUnstakes = commonData?.pendingUnstakes ?? ZERO;
  const isShowed = !amount.isZero() || isBalancesLoading;

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(addFTMTokenToWallet());
  }, [dispatchRequest]);

  return {
    amount,
    pendingUnstakes,
    network,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(Token.aFTMb, Token.FTM),
    isShowed,
    isBalancesLoading,
    stakeLink: RoutesConfig.stake.generatePath(),
    unstakeLink: featuresConfig.unstakeFantom
      ? RoutesConfig.unstake.generatePath()
      : undefined,
    isStakeLoading,
    isUnstakeLoading,
    handleAddTokenToWallet,
  };
};
