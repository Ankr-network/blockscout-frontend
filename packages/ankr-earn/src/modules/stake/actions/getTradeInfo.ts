import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import {
  getOpenOceanQuote,
  IGetOpenOceanQuoteProps,
} from '../api/getOpenOceanQuote';

interface IGetTradeInfoProps extends IGetOpenOceanQuoteProps {}

export const { useGetTokenTradeAmountQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTokenTradeAmount: build.query<number, IGetTradeInfoProps>({
      queryFn: queryFnNotifyWrapper<IGetTradeInfoProps, never, number>(
        async ({ baseToken, network, targetToken }) => {
          const { outAmount } = await getOpenOceanQuote({
            baseToken,
            network,
            targetToken,
          });

          return { data: outAmount };
        },
        undefined,
        { showNotificationOnError: false },
      ),
    }),
  }),
});
