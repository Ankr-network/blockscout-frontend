import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { Address } from '@ankr.com/provider';

import { configFromEnv } from 'modules/api/config';
import {
  ETH_DECIMALS,
  OPENOCEAN_MAX_SAFE_GAS_VALUE,
  OPENOCEAN_QUOTE_URL,
  ZERO_ADDR,
} from 'modules/common/const';
import { EEthereumNetworkId, Env, TNumberAsString } from 'modules/common/types';

import {
  EOpenOceanExChanges,
  EOpenOceanNetworks,
  EOpenOceanTokens,
} from '../types';

type TGetStakeTradeInfoTokenPriceData =
  IGetStakeTradeInfoTokenPriceResData | null;

interface IGetStakeTradeInfoTokenPriceProps {
  baseToken: EOpenOceanTokens;
  network: EOpenOceanNetworks;
  targetToken: EOpenOceanTokens;
}

interface IGetStakeTradeInfoTokenPriceParams {
  amount: number;
  chainId: EEthereumNetworkId;
  exChange: EOpenOceanExChanges;
  gasPrice: number;
  inTokenAddress: Address;
  inTokenSymbol: EOpenOceanTokens;
  // eslint-disable-next-line camelcase
  in_token_decimals: number;
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
    aMaticCToken: aMATICcInETHContract,
    aMaticbToken: aMATICbInETHContract,
    aethContract: aETHcContract,
    fethContract: aETHbContract,
    maticToken: MATICInETHContract,
  },
  fantomConfig: {
    aftmbToken: aFTMbContract,
    aftmcToken: aFTMcContract,
    ftmToken: FTMContract,
  },
  polygonConfig: {
    aMATICbToken: aMATICbInPolygonContract,
    aMATICcToken: aMATICcInPolygonContract,
    maticToken: MATICInPolygonContract,
  },
} = configFromEnv(Env.Production);

const getChainId = (
  network: EOpenOceanNetworks,
  baseToken: EOpenOceanTokens,
): EEthereumNetworkId => {
  switch (baseToken) {
    case EOpenOceanTokens.AVAX:
      return EEthereumNetworkId.avalanche;

    case EOpenOceanTokens.BNB:
      return EEthereumNetworkId.smartchain;

    case EOpenOceanTokens.FTM:
      return EEthereumNetworkId.fantom;

    case EOpenOceanTokens.MATIC:
      return network === EOpenOceanNetworks.POLYGON
        ? EEthereumNetworkId.polygon
        : EEthereumNetworkId.mainnet;

    case EOpenOceanTokens.ETH:
    default:
      return EEthereumNetworkId.mainnet;
  }
};

const getTokenAddress = (
  network: EOpenOceanNetworks,
  token: EOpenOceanTokens,
): Address => {
  switch (token) {
    case EOpenOceanTokens.AVAX:
      return ZERO_ADDR;

    case EOpenOceanTokens.FTM:
      return FTMContract;

    case EOpenOceanTokens.MATIC:
      return network === EOpenOceanNetworks.POLYGON
        ? MATICInPolygonContract
        : MATICInETHContract;

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
      return network === EOpenOceanNetworks.POLYGON
        ? aMATICbInPolygonContract
        : aMATICbInETHContract;

    case EOpenOceanTokens.aMATICc:
      return network === EOpenOceanNetworks.POLYGON
        ? aMATICcInPolygonContract
        : aMATICcInETHContract;

    case EOpenOceanTokens.BNB:
    case EOpenOceanTokens.ETH:
    default:
      return ETHContract;
  }
};

/**
 *  @note https://docs.openocean.finance/dev/legacy/openocean-api-2.0#1.-quote-price
 */
export const getStakeTradeInfoTokenPrice = createAction<
  RequestAction<
    TGetStakeTradeInfoTokenPriceData,
    TGetStakeTradeInfoTokenPriceData
  >,
  [IGetStakeTradeInfoTokenPriceProps]
>(
  'stake/getStakeTradeInfoTokenPrice',
  ({ baseToken, network, targetToken }): RequestAction => ({
    request: {
      method: 'get',
      params: {
        amount: 1,
        chainId: getChainId(network, baseToken),
        exChange: EOpenOceanExChanges.OpenOceanV2,
        gasPrice: OPENOCEAN_MAX_SAFE_GAS_VALUE,
        inTokenAddress: getTokenAddress(network, baseToken),
        inTokenSymbol: baseToken,
        in_token_decimals: ETH_DECIMALS,
        outTokenAddress: getTokenAddress(network, targetToken),
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
