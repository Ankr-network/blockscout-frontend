import { RequestAction } from '@redux-requests/core';
import { BlockchainNetworkId, Seconds } from 'modules/common/types';
import { TStore } from 'modules/common/types/ReduxRequests';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { TExChange } from '../api/getQuotePrice';
import { ACTIONS_PREFIX, platformsByTokenMap } from '../const';
import { AvailableTokens } from '../types';
import { getGasPrice } from './getGasPrice';
import { getQuotePrice, IGetQuotePrice } from './getQuotePrice';

const GAS_PRICE_CACHE_TIME: Seconds = 30;

interface IGetPricesArgs {
  fromToken: AvailableTokens;
  toToken: AvailableTokens;
  amount?: number;
  chainId?: BlockchainNetworkId;
}

export const getPrices = createAction<
  RequestAction<IGetQuotePrice[], IGetQuotePrice[]>,
  [IGetPricesArgs]
>(
  `${ACTIONS_PREFIX}getPrices`,
  ({
    fromToken,
    toToken,
    amount = 1,
    chainId = BlockchainNetworkId.mainnet,
  }) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      getData: data => data,
      onRequest: (
        _request: any,
        _action: RequestAction,
        store: TStore<RootState>,
      ) => {
        return {
          promise: (async (): Promise<IGetQuotePrice[]> => {
            const { dispatchRequest } = store;

            const platformsToRequest = getPlatformsToRequest(
              fromToken,
              toToken,
            );

            const { data: gasPrice } = await dispatchRequest(
              getGasPrice(chainId, {
                requestKey: `/network-${chainId}`,
                cache: GAS_PRICE_CACHE_TIME,
              }),
            );

            const requests = platformsToRequest.map(paltform => {
              return dispatchRequest(
                getQuotePrice(
                  {
                    chainId,
                    fromToken,
                    toToken,
                    amount,
                    gasPrice,
                    exChange: paltform as TExChange,
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
  }),
);

const getPlatformsToRequest = (
  tokenOne: AvailableTokens,
  tokenTwo: AvailableTokens,
): string[] => {
  let platforms: string[] | undefined = platformsByTokenMap[tokenOne];
  if (!platforms) {
    platforms = platformsByTokenMap[tokenTwo];
  }
  return platforms;
};
