import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { convertFromWei } from 'modules/common/utils/numbers/convertFromWei';

import {
  getOpenOceanQuote,
  IGetOpenOceanQuoteProps,
} from '../api/getOpenOceanQuote';

interface IGetTradeInfoProps extends IGetOpenOceanQuoteProps {}

export const { useGetTokenTradeAmountQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTokenTradeAmount: build.query<BigNumber, IGetTradeInfoProps>({
      queryFn: queryFnNotifyWrapper<IGetTradeInfoProps, never, BigNumber>(
        async ({ baseToken, network, targetToken }) => {
          const { outAmount } = await getOpenOceanQuote({
            baseToken,
            network,
            targetToken,
          });

          return { data: convertFromWei(outAmount) };
        },
        undefined,
        { showNotificationOnError: false },
      ),
    }),
  }),
});
