import axios from 'axios';

import { Token } from 'modules/common/types/token';
import { getTokenAddress } from 'modules/stake/api/getOpenOceanQuote/utils/getTokenAddress';

import { OPENOCEAN_MAX_SAFE_GAS_VALUE, OPENOCEAN_QUOTE_URL_V3 } from './const';
import {
  IGetOpenOceanQuote,
  IGetOpenOceanQuoteData,
  IGetOpenOceanQuoteParams,
  TOpenOceanChains,
} from './types';

export interface IGetOpenOceanQuoteProps {
  baseToken: Token;
  network: TOpenOceanChains;
  targetToken: Token;
}

/**
 *  API documentation can be found [here](https://docs.openocean.finance/dev/openocean-api-3.0/api-reference#api-reference)
 */
export const getOpenOceanQuote = async ({
  baseToken,
  network,
  targetToken,
}: IGetOpenOceanQuoteProps): Promise<IGetOpenOceanQuoteData> => {
  const url = OPENOCEAN_QUOTE_URL_V3.replace(':chain', network);

  const requestParams: IGetOpenOceanQuoteParams = {
    amount: '1',
    gasPrice: `${OPENOCEAN_MAX_SAFE_GAS_VALUE}`,
    inTokenAddress: getTokenAddress(baseToken, network),
    outTokenAddress: getTokenAddress(targetToken, network),
    slippage: '1',
  };

  const {
    data: { data: tradeInfoData, error },
  } = await axios.get<IGetOpenOceanQuote>(url, {
    params: requestParams,
  });

  if (!tradeInfoData) {
    throw new Error(error ?? 'Trade info is empty');
  }

  return tradeInfoData;
};
