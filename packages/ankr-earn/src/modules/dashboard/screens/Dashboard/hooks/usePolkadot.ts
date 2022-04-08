import { resetRequests } from '@redux-requests/core';

import { AvailableWriteProviders } from 'provider';

import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { fetchETHTokenClaimableBalance } from 'modules/stake-polkadot/actions/fetchETHTokenClaimableBalance';
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
    () => {
      dispatch(
        resetRequests(
          getPolkadotResetRequests([fetchETHTokenClaimableBalance.toString()]),
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
        },
      );
    },
    [address, dispatch, fetchETHTokenClaimableBalance],
    AvailableWriteProviders.polkadotCompatible,
  );

  // ETH
  useProviderEffect(
    () => {
      dispatch(
        resetRequests(
          getPolkadotResetRequests([
            fetchETHTokenBalance.toString(),
            fetchTxHistory.toString(),
          ]),
        ),
      );

      (POLKADOT_NETWORK_KEYS as EPolkadotNetworks[]).forEach(
        (network): void => {
          dispatch(fetchETHTokenBalance(network));
        },
      );
    },
    [dispatch, fetchETHTokenBalance, fetchTxHistory],
    AvailableWriteProviders.ethCompatible,
  );
};
