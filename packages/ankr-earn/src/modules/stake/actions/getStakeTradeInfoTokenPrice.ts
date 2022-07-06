import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { Address, EEthereumNetworkId } from '@ankr.com/provider';

import { configFromEnv } from 'modules/api/config';
import {
  ETH_DECIMALS,
  OPENOCEAN_MAX_SAFE_GAS_VALUE,
  OPENOCEAN_QUOTE_URL,
  ZERO_ADDR,
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
  // eslint-disable-next-line camelcase
  out_token_decimals: number;
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
  avalancheConfig: { aAVAXb: aAVAXbContract, aAVAXc: aAVAXcContract },
  binanceConfig: { aBNBbToken: aBNBbContract, aBNBcToken: aBNBcContract },
  contractConfig: {
    ETHContract,
    aMaticCToken: aMATICcContract,
    aMaticbToken: aMATICbContract,
    aethContract: aETHcContract,
    fethContract: aETHbContract,
    maticToken: MATICContract,
  },
  fantomConfig: {
    aftmbToken: aFTMbContract,
    aftmcToken: aFTMcContract,
    ftmToken: FTMContract,
  },
} = configFromEnv(Env.Production);

const getChainId = (token: EOpenOceanTokens): EEthereumNetworkId => {
  switch (token) {
    case EOpenOceanTokens.AVAX:
      return EEthereumNetworkId.avalanche;

    case EOpenOceanTokens.BNB:
      return EEthereumNetworkId.smartchain;

    case EOpenOceanTokens.FTM:
      return EEthereumNetworkId.fantom;

    case EOpenOceanTokens.ETH:
    case EOpenOceanTokens.MATIC:
    default:
      return EEthereumNetworkId.mainnet;
  }
};

const getTokenAddress = (token: EOpenOceanTokens): Address => {
  switch (token) {
    case EOpenOceanTokens.AVAX:
      return ZERO_ADDR;

    case EOpenOceanTokens.FTM:
      return FTMContract;

    case EOpenOceanTokens.MATIC:
      return MATICContract;

    case EOpenOceanTokens.aAVAXb:
      return aAVAXbContract;

    case EOpenOceanTokens.aAVAXc:
      return aAVAXcContract;

    case EOpenOceanTokens.aBNBb:
      return aBNBbContract;

    case EOpenOceanTokens.aBNBc:
      return aBNBcContract;

    case EOpenOceanTokens.aETHb:
      return aETHbContract;

    case EOpenOceanTokens.aETHc:
      return aETHcContract;

    case EOpenOceanTokens.aFTMb:
      return aFTMbContract;

    case EOpenOceanTokens.aFTMc:
      return aFTMcContract;

    case EOpenOceanTokens.aMATICb:
      return aMATICbContract;

    case EOpenOceanTokens.aMATICc:
      return aMATICcContract;

    case EOpenOceanTokens.BNB:
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
        out_token_decimals: ETH_DECIMALS,
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
