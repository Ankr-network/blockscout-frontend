import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

export interface IDepositAddressReply {
  address: string;
}

/**
 * Part of [DOT/KSM staking](https://ankrnetwork.atlassian.net/wiki/spaces/SP/pages/1646428256/Technical+description+of+staking+process+backend+-+frontend+-+contract+protocol#Stake-DOT%2FKSM).
 *
 * Requests deposit address specifying his polkadot address.
 */
export const fetchGlossary = createSmartAction<RequestAction<any, any>, any>(
  'academy/fetchGlossary',
  () => ({
    request: {
      url: `/glossaries?populate[GlossaryItems][populate]=*`,
      method: 'get',
    },
    meta: {
      driver: 'axios',
      asMutation: false,
      showNotificationOnError: true,
      getData: data => {
        return data.data.map((item: any) => ({
          id: item.id,
          ...item.attributes,
        }));
      },
    },
  }),
);
