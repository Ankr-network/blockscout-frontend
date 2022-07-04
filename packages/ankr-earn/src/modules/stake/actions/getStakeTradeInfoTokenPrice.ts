import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { Address, EEthereumNetworkId } from '@ankr.com/provider';

import { configFromEnv } from 'modules/api/config';
import {
  OPENOCEAN_MAX_SAFE_GAS_VALUE,
  OPENOCEAN_QUOTE_URL,
} from 'modules/common/const';
import { Env, TNumberAsString } from 'modules/common/types';

import { EOpenOceanExChanges, EOpenOceanTokens } from '../types';

type TGetStakeTradeInfoTokenPriceData =
  IGetStakeTradeInfoTokenPriceResData | null;

interface IGetStakeTradeInfoTokenPriceProps {
  baseToken: EOpenOceanTokens;
  targetToken: EOpenOceanTokens;
}

interface IGetStakeTradeInfoTokenPriceParams {
  amount: number;
  chainId: EEthereumNetworkId;
  exChange: EOpenOceanExChanges;
  gasPrice: number;
  inTokenAddress: Address;
  inTokenSymbol: EOpenOceanTokens;
  outTokenAddress: Address;
  outTokenSymbol: EOpenOceanTokens;
  slippage: number;
}

interface IGetStakeTradeInfoTokenPriceResData {
  exChange: EOpenOceanExChanges;
  inAmount: TNumberAsString;
  inToken: {
    address: Address;
    chainId: EEthereumNetworkId;
    symbol: EOpenOceanTokens;
  };
  outAmount: number;
  outToken: {
    address: Address;
    chainId: EEthereumNetworkId;
    symbol: EOpenOceanTokens;
  };
  transCost: TNumberAsString;
}

interface IGetStakeTradeInfoTokenPriceRes {
  code?: number;
  data?: IGetStakeTradeInfoTokenPriceResData;
  error?: string;
  message?: string;
}

const {
  contractConfig: {
    ETHContract,
    aethContract: aETHcContract,
    fethContract: aETHbContract,
  },
} = configFromEnv(Env.Production);

const getChainId = (token: EOpenOceanTokens): EEthereumNetworkId => {
  switch (token) {
    case EOpenOceanTokens.aETHb:
    case EOpenOceanTokens.aETHc:
    case EOpenOceanTokens.ETH:
    default:
      return EEthereumNetworkId.mainnet;
  }
};

const getTokenAddress = (token: EOpenOceanTokens): Address => {
  switch (token) {
    case EOpenOceanTokens.aETHb:
      return aETHbContract;

    case EOpenOceanTokens.aETHc:
      return aETHcContract;

    case EOpenOceanTokens.ETH:
    default:
      return ETHContract;
  }
};

/**
 *  @note https://docs.openocean.finance/api/openocean-dex-api-2.0#1.-quote-price
 */
export const getStakeTradeInfoTokenPrice = createAction<
  RequestAction<
    TGetStakeTradeInfoTokenPriceData,
    TGetStakeTradeInfoTokenPriceData
  >,
  [IGetStakeTradeInfoTokenPriceProps]
>(
  'stake/getStakeTradeInfoTokenPrice',
  ({ baseToken, targetToken }): RequestAction => ({
    request: {
      method: 'get',
      params: {
        amount: 1,
        chainId: getChainId(baseToken),
        exChange: EOpenOceanExChanges.OpenOceanV2,
        gasPrice: OPENOCEAN_MAX_SAFE_GAS_VALUE,
        inTokenAddress: getTokenAddress(baseToken),
        inTokenSymbol: baseToken,
        outTokenAddress: getTokenAddress(targetToken),
        outTokenSymbol: targetToken,
        slippage: 1,
      } as IGetStakeTradeInfoTokenPriceParams,
      url: OPENOCEAN_QUOTE_URL,
    },
    meta: {
      asMutation: true,
      driver: 'axios',
      showNotificationOnError: true,
      silent: true,
      getData: (
        data: IGetStakeTradeInfoTokenPriceRes,
      ): TGetStakeTradeInfoTokenPriceData => data?.data ?? null,
    },
  }),
);
