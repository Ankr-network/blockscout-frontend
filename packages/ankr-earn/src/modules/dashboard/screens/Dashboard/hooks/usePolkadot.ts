import { AvailableWriteProviders } from '@ankr.com/provider';
import { resetRequests } from '@redux-requests/core';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { featuresConfig } from 'modules/common/const';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { fetchETHTokenClaimableBalance } from 'modules/stake-polkadot/actions/fetchETHTokenClaimableBalance';
import { fetchPolkadotAccountMaxSafeBalance } from 'modules/stake-polkadot/actions/fetchPolkadotAccountMaxSafeBalance';
import { fetchPolkadotPendingHistoryAmountSum } from 'modules/stake-polkadot/actions/fetchPolkadotPendingHistoryAmountSum';
import { fetchTxHistory } from 'modules/stake-polkadot/actions/fetchTxHistory';
import { POLKADOT_NETWORK_KEYS } from 'modules/stake-polkadot/const';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotResetRequests } from 'modules/stake-polkadot/utils/getPolkadotResetRequests';
import { useAppDispatch } from 'store/useAppDispatch';

export const usePolkadot = (): void => {
  const dispatch = useAppDispatch();

  const { address } = useConnectedData(
    AvailableWriteProviders.polkadotCompatible,
  );

  // Polkadot
  useProviderEffect(
    (): void => {
      dispatch(
        resetRequests(
          getPolkadotResetRequests([
            fetchETHTokenClaimableBalance.toString(),
            fetchPolkadotAccountMaxSafeBalance.toString(),
          ]),
        ),
      );

      if (typeof address !== 'string') {
        return;
      }

      (POLKADOT_NETWORK_KEYS as EPolkadotNetworks[]).forEach(
        (network): void => {
          dispatch(
            fetchETHTokenClaimableBalance({
              address,
              network,
            }),
          );

          dispatch(
            fetchPolkadotAccountMaxSafeBalance({
              isExternalCall: true,
              network,
            }),
          );
        },
      );
    },
    [
      address,
      dispatch,
      fetchETHTokenClaimableBalance,
      fetchPolkadotAccountMaxSafeBalance,
    ],
    AvailableWriteProviders.polkadotCompatible,
  );

  // ETH
  useProviderEffect((): void => {
    dispatch(
      resetRequests(
        getPolkadotResetRequests([
          fetchETHTokenBalance.toString(),
          fetchPolkadotPendingHistoryAmountSum.toString(),
          fetchTxHistory.toString(),
        ]),
      ),
    );

    (POLKADOT_NETWORK_KEYS as EPolkadotNetworks[]).forEach((network): void => {
      dispatch(fetchETHTokenBalance(network));

      if (featuresConfig.isActivePolkadotStaking) {
        dispatch(fetchPolkadotPendingHistoryAmountSum(network));
      }
    });
  }, [
    dispatch,
    fetchETHTokenBalance,
    fetchPolkadotPendingHistoryAmountSum,
    fetchTxHistory,
  ]);
};
