import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { TNetworkType } from 'polkadot';

export interface IDepositAddressReply {
  address: string;
}

/**
 * Part of [DOT/KSM staking](https://ankrnetwork.atlassian.net/wiki/spaces/SP/pages/1646428256/Technical+description+of+staking+process+backend+-+frontend+-+contract+protocol#Stake-DOT%2FKSM).
 *
 * Requests deposit address specifying his polkadot address.
 */
export const getDepositAddress = createSmartAction<
  RequestAction<IDepositAddressReply, string>,
  [TNetworkType]
>('POLKADOT_DEPOSIT_ADDR', network => ({
  request: {
    url: `/v1alpha/polkadot/depositAddress`,
    method: 'post',
    data: { network },
  },
  meta: {
    driver: 'axios',
    asMutation: false,
    showNotificationOnError: true,
    getData: data => {
      return data.address;
    },
  },
}));
