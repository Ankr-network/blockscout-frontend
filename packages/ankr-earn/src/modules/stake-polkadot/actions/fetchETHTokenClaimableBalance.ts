import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { TPolkadotAddress } from 'polkadot';

import { EPolkadotNetworks } from '../types';
import { getPolkadotRequestKey } from '../utils/getPolkadotRequestKey';

interface IFetchETHTokenClaimableBalanceProps {
  address: TPolkadotAddress;
  network: EPolkadotNetworks;
}

interface IFetchETHTokenClaimableBalanceData {
  claimable: BigNumber;
  total: BigNumber;
}

interface IDataRes {
  claimable?: string;
  total?: string;
}

export const fetchETHTokenClaimableBalance = createSmartAction<
  RequestAction<IDataRes, IFetchETHTokenClaimableBalanceData>,
  [IFetchETHTokenClaimableBalanceProps]
>('polkadot/fetchETHTokenClaimableBalance', ({ address, network }) => ({
  request: {
    params: {
      address,
      network,
    },
    method: 'get',
    url: '/v1alpha/polkadot/balance',
  },
  meta: {
    asMutation: false,
    driver: 'axios',
    getData: (data: IDataRes): IFetchETHTokenClaimableBalanceData => ({
      claimable: new BigNumber(data?.claimable ?? 0),
      total: new BigNumber(data?.total ?? 0),
    }),
    requestKey: getPolkadotRequestKey(network),
  },
}));
