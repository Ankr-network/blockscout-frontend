import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { EEthereumNetworkId } from 'modules/common/types';

import {
  IGetQuotePriceParams,
  IGetQuotePriceReply,
  OPENOCEAN_QUOTE_URL,
  TExChange,
} from '../api/getQuotePrice';
import { AvailableTokens } from '../types';
import { getTokenAddr } from '../utils/getTokenAddr';

// if it is more, an error will occur
const MAX_GAS_PRICE = 300;
const DEFAULT_TOKEN_DECIMALS = 18;

export interface IGetQuotePriceArgs {
  exChange?: TExChange;
  chainId?: number;
  fromToken: AvailableTokens;
  toToken: AvailableTokens;
  amount: number;
  gasPrice?: number;
  slippage?: number;
}

export interface IGetQuotePrice {
  inToken: {
    symbol: string;
    chainId: string;
    address: string;
  };
  outToken: {
    symbol: string;
    chainId: string;
    address: string;
  };
  inAmount: string;
  outAmount: number;
  exChange: string;
  transCost: string;
  transUsd: number;
}

/**
 * https://docs.openocean.finance/api/openocean-dex-api-2.0#1.-quote-price
 */
export const getQuotePrice = createAction<
  RequestAction<IGetQuotePriceReply, IGetQuotePrice | undefined>,
  [
    IGetQuotePriceArgs,
    RequestActionMeta<IGetQuotePriceReply, IGetQuotePrice | undefined>?,
  ]
>(
  'tradingCockpit/getQuotePrice',
  (
    {
      exChange = '1inch',
      chainId = EEthereumNetworkId.mainnet,
      fromToken,
      toToken,
      amount,
      gasPrice = 5,
      slippage = 100,
    },
    meta,
  ) => ({
    request: {
      method: 'get',
      url: OPENOCEAN_QUOTE_URL,
      params: {
        exChange,
        chainId,
        inTokenSymbol: fromToken,
        inTokenAddress: getTokenAddr(fromToken),
        outTokenSymbol: toToken,
        outTokenAddress: getTokenAddr(toToken),
        amount,
        gasPrice: gasPrice > MAX_GAS_PRICE ? MAX_GAS_PRICE : gasPrice,
        slippage,
        in_token_decimals: DEFAULT_TOKEN_DECIMALS,
        out_token_decimals: DEFAULT_TOKEN_DECIMALS,
      } as IGetQuotePriceParams,
    },
    meta: {
      driver: 'axios',
      showNotificationOnError: true,
      requestKey: `/${exChange}`,
      getData: ({ error, data }) => {
        // To avoid this type of error notification you might need
        // to look at the https://github.com/klis87/redux-requests/discussions/470
        // todo: throw exception
        if (!data) {
          // eslint-disable-next-line no-console
          console.error(`${getQuotePrice.toString()}: ${error?.message}`);
          return undefined;
        }

        return data;
      },
      ...meta,
    },
  }),
);
