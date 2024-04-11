import { configFromEnv, getBlochainByChainId } from './utils';
import { postRequestConfig } from './const';


type MethodToTypes = {
  ankr_getTokenPrice: [
    { blockchain: string; contractAddress?: string },
    { blockchain: string; contractAddress?: string; usdPrice: string },
  ];
};

type Method = keyof MethodToTypes;

interface IRpcReqParams {
  method: Method;
  params: MethodToTypes[Method][0];
}

const buildRpcRequestData = ({ method, params }: IRpcReqParams) => {
  return {
    jsonrpc: '2.0',
    method,
    params,
    id: Date.now(),
  };
};

const config = configFromEnv();

export const getAdvancedApi = <T extends Method>(
  method: T,
  params: MethodToTypes[T][0],
): Promise<MethodToTypes[T][1]> => {
  const body = buildRpcRequestData({ method, params });

  return fetch(config.advancedApiUrl, {
    ...postRequestConfig,
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(res => res.result);
};

export const getTokenPriceByChainId = async (chainId: number, tokenAddress?: string) => {
  const blockchain = getBlochainByChainId(chainId);

  return getAdvancedApi('ankr_getTokenPrice', {
    blockchain,
    contractAddress: tokenAddress,
  }).then(res => res?.usdPrice);
};