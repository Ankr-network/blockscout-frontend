import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { BlockchainNetworkId } from 'modules/common/types';
import { createAction } from 'redux-smart-actions';
import { ACTIONS_PREFIX } from '../const';

interface IGetGasPriceReply {
  code: number;
  data?: {
    gasPrice: number;
  };
  error?: {
    message: string;
    name: string;
    stack: string;
  };
}

/**
 * https://docs.openocean.finance/api/openocean-dex-api-2.0#9.-getgasprice
 */
export const getGasPrice = createAction<
  RequestAction<IGetGasPriceReply, number | undefined>,
  [
    BlockchainNetworkId,
    RequestActionMeta<IGetGasPriceReply, number | undefined>?,
  ]
>(
  `${ACTIONS_PREFIX}getGasPrice`,
  (chainId = BlockchainNetworkId.mainnet, meta) => ({
    request: {
      method: 'get',
      url: `https://open-api.openocean.finance/v1/${chainId}/getGasPrice`,
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      driver: 'axios',
      getData: ({ error, data }) => {
        // To avoid this type of error notification you might need
        // to look at the https://github.com/klis87/redux-requests/discussions/470
        // todo: throw exception
        if (!data) {
          console.error(`${getGasPrice.toString()}: ${error?.message}`);
          return;
        }

        return data.gasPrice;
      },
      ...meta,
    },
  }),
);
