import { abortRequests, resetRequests } from '@redux-requests/core';

import { AvailableWriteProviders } from 'common';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { featuresConfig } from 'modules/common/const';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { fetchETHTokenClaimableBalance } from 'modules/stake-polkadot/actions/fetchETHTokenClaimableBalance';
import { fetchPolkadotAccountFullBalance } from 'modules/stake-polkadot/actions/fetchPolkadotAccountFullBalance';
import { fetchPolkadotPendingHistoryAmountSum } from 'modules/stake-polkadot/actions/fetchPolkadotPendingHistoryAmountSum';
import { fetchTxHistory } from 'modules/stake-polkadot/actions/fetchTxHistory';
import { POLKADOT_NETWORK_KEYS } from 'modules/stake-polkadot/const';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotResetRequests } from 'modules/stake-polkadot/utils/getPolkadotResetRequests';
import { useAppDispatch } from 'store/useAppDispatch';

const dispatchETHResetRequests = () =>
  resetRequests(
    getPolkadotResetRequests([
      fetchETHTokenBalance.toString(),
      fetchPolkadotPendingHistoryAmountSum.toString(),
      fetchTxHistory.toString(),
    ]),
  );

const dispatchPolkadotResetRequests = () =>
  resetRequests(
    getPolkadotResetRequests([
      fetchETHTokenClaimableBalance.toString(),
      fetchPolkadotAccountFullBalance.toString(),
    ]),
  );

export const usePolkadot = (): void => {
  const dispatch = useAppDispatch();

  const { address } = useConnectedData(
    AvailableWriteProviders.polkadotCompatible,
  );

  // Polkadot
  useProviderEffect(
    () => {
      dispatch(dispatchPolkadotResetRequests());

      if (typeof address === 'string') {
        (POLKADOT_NETWORK_KEYS as EPolkadotNetworks[]).forEach(
          (network): void => {
            dispatch(
              fetchETHTokenClaimableBalance({
                address,
                network,
              }),
            );

            dispatch(fetchPolkadotAccountFullBalance(network));
          },
        );
      }

      return () => {
        dispatch(abortRequests());
        dispatch(dispatchPolkadotResetRequests());
      };
    },
    [
      address,
      dispatch,
      fetchETHTokenClaimableBalance,
      fetchPolkadotAccountFullBalance,
    ],
    AvailableWriteProviders.polkadotCompatible,
  );

  // ETH
  useProviderEffect(() => {
    dispatch(dispatchETHResetRequests());

    (POLKADOT_NETWORK_KEYS as EPolkadotNetworks[]).forEach((network): void => {
      dispatch(fetchETHTokenBalance(network));

      if (featuresConfig.isActivePolkadotStaking) {
        dispatch(fetchPolkadotPendingHistoryAmountSum(network));
      }
    });

    return () => {
      dispatch(abortRequests());
      dispatch(dispatchETHResetRequests());
    };
  }, [
    dispatch,
    fetchETHTokenBalance,
    fetchPolkadotPendingHistoryAmountSum,
    fetchTxHistory,
  ]);
};
