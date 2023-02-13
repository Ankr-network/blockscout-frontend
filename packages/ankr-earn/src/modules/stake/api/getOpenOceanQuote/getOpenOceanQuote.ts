import axios from 'axios';

import { ETH_DECIMALS } from '@ankr.com/staking-sdk';

import { getChainIdByToken } from 'modules/stake/api/getOpenOceanQuote/utils/getChainIdByToken';
import { getTokenAddress } from 'modules/stake/api/getOpenOceanQuote/utils/getTokenAddress';

import { OPENOCEAN_MAX_SAFE_GAS_VALUE, OPENOCEAN_QUOTE_URL } from './const';
import {
  IGetOpenOceanQuote,
  IGetOpenOceanQuoteData,
  IGetOpenOceanQuoteParams,
  TOpenOceanNetworks,
  TOpenOceanTokens,
} from './types';

export interface IGetOpenOceanQuoteProps {
  baseToken: TOpenOceanTokens;
  network: TOpenOceanNetworks;
  targetToken: TOpenOceanTokens;
}

/**
 *  API documentation can be found [here](https://docs.openocean.finance/dev/legacy/openocean-api-2.0#1.-quote-price)
 */
export const getOpenOceanQuote = async ({
  baseToken,
  network,
  targetToken,
}: IGetOpenOceanQuoteProps): Promise<IGetOpenOceanQuoteData> => {
  const requestParams: IGetOpenOceanQuoteParams = {
    amount: 1,
    chainId: getChainIdByToken(baseToken, network),
    exChange: 'openoceanv2',
    gasPrice: OPENOCEAN_MAX_SAFE_GAS_VALUE,
    inTokenAddress: getTokenAddress(baseToken, network),
    inTokenSymbol: baseToken,
    in_token_decimals: ETH_DECIMALS,
    outTokenAddress: getTokenAddress(targetToken, network),
    outTokenSymbol: targetToken,
    out_token_decimals: ETH_DECIMALS,
    slippage: 1,
  };

  const {
    data: { data: tradeInfoData, error },
  } = await axios.get<IGetOpenOceanQuote>(OPENOCEAN_QUOTE_URL, {
    params: requestParams,
  });

  if (!tradeInfoData) {
    throw new Error(error ?? 'Trade info is empty');
  }

  return tradeInfoData;
};
