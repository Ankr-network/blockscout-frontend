import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { Seconds } from 'modules/common/types';
import { TStore } from 'modules/common/types/ReduxRequests';

import { TExChange } from '../api/getQuotePrice';
import { ACTIONS_PREFIX, platformsByTokenMap } from '../const';
import { AvailableTokens } from '../types';
import { getChainIdByToken } from '../utils/getChainIdByToken';

import { getGasPrice } from './getGasPrice';
import { getQuotePrice, IGetQuotePrice } from './getQuotePrice';

const GAS_PRICE_CACHE_TIME: Seconds = 30;

const getPlatformsToRequest = (
  tokenOne: AvailableTokens,
  tokenTwo: AvailableTokens,
): string[] => {
  return platformsByTokenMap[tokenOne] || platformsByTokenMap[tokenTwo];
};

interface IGetPricesArgs {
  fromToken: AvailableTokens;
  toToken: AvailableTokens;
  amount?: number;
}

export const getPrices = createAction<
  RequestAction<IGetQuotePrice[], IGetQuotePrice[]>,
  [IGetPricesArgs]
>(`${ACTIONS_PREFIX}getPrices`, ({ fromToken, toToken, amount = 1 }) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    getData: data => data,
    onRequest: (_request, _action, store: TStore<IStoreState>) => {
      return {
        promise: (async (): Promise<IGetQuotePrice[]> => {
          const { dispatchRequest } = store;
          // TODO Add supporting of strings
          const chainId = getChainIdByToken(fromToken) as number;

          const platformsToRequest = getPlatformsToRequest(fromToken, toToken);

          const { data: gasPrice } = await dispatchRequest(
            getGasPrice(chainId, {
              requestKey: `/network-${chainId}`,
              cache: GAS_PRICE_CACHE_TIME,
            }),
          );

          const requests = platformsToRequest.map(platform => {
            return dispatchRequest(
              getQuotePrice(
                {
                  chainId,
                  fromToken,
                  toToken,
                  amount,
                  gasPrice,
                  exChange: platform as TExChange,
                },
                { asMutation: true, silent: true },
              ),
            );
          });

          const data = await Promise.all(requests);

          return data.reduce<IGetQuotePrice[]>((acc, item) => {
            if (item.data && item.data.outAmount > 0) {
              acc.push(item.data);
            }
            return acc;
          }, []);
        })(),
      };
    },
  },
}));
