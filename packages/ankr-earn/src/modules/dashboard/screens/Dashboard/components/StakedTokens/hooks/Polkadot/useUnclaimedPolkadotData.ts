import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { STAKE_LEGACY_LINKS, ZERO } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { fetchETHTokenClaimableBalance } from 'modules/stake-polkadot/actions/fetchETHTokenClaimableBalance';
import {
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';

export interface IUseClaimedPolkadotDataProps {
  ethToken: TPolkadotETHToken;
  network: EPolkadotNetworks;
  polkadotToken: TPolkadotToken;
}

interface IUseClaimedPolkadotData {
  amount: BigNumber;
  claimLink: string;
  ethToken: TPolkadotETHToken;
  isLoading: boolean;
  isShowed: boolean;
  networkTxt: string;
  polkadotToken: TPolkadotToken;
}

/**
 *  TODO Add logic for this beta version (Polkadot claiming)
 */
export const useUnclaimedPolkadotData = ({
  ethToken,
  network,
  polkadotToken,
}: IUseClaimedPolkadotDataProps): IUseClaimedPolkadotData => {
  const { data: claimableBalance, loading: isLoading } = useQuery({
    type: fetchETHTokenClaimableBalance,
    requestKey: getPolkadotRequestKey(network),
  });

  const amount = claimableBalance?.claimable ?? ZERO;

  const claimLink = STAKE_LEGACY_LINKS[polkadotToken] ?? '';

  const isShowed = !amount?.isZero() || isLoading;

  const networkTxt = useMemo(
    () =>
      t('dashboard.card.network-info', {
        network: t(`stake-polkadot.networks.${network}`),
      }),
    [network],
  );

  return {
    amount,
    claimLink,
    ethToken,
    isLoading,
    isShowed,
    networkTxt,
    polkadotToken,
  };
};
