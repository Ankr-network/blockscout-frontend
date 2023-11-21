import { ChainID } from 'modules/chains/types';
import { API_ENV } from 'modules/common/utils/environment';

const PROD_STANDALONE_CHAINS: Record<string, string> = {
  [ChainID.BSC]: 'https://bscrpc.com/api/v1/stats/bsc/',
  [ChainID.FANTOM]: 'https://rpc.ftm.tools/api/v1/stats/fantom/',
  [ChainID.POLYGON]: 'https://polygon-rpc.com/api/v1/stats/polygon/',
  [ChainID.POLYGON_ZKEVM]: 'https://polygon-rpc.com/api/v1/stats/zkevm/',
};

const STAGING_STANDALONE_CHAINS: Record<string, string> = {
  [ChainID.BSC]: 'https://staging.bscrpc.com/api/v1/stats/bsc/',
  [ChainID.FANTOM]: 'https://staging.rpc.ftm.tools/api/v1/stats/fantom/',
  [ChainID.POLYGON]: 'https://staging.polygon-rpc.com/api/v1/stats/polygon/',
  [ChainID.POLYGON_ZKEVM]:
    'https://staging.polygon-rpc.com/api/v1/stats/zkevm/',
};

export const STANDALONE_CHAINS =
  API_ENV === 'prod' ? PROD_STANDALONE_CHAINS : STAGING_STANDALONE_CHAINS;

export const getStandaloneUrl = (chainId: string) => {
  return STANDALONE_CHAINS[chainId] ?? '';
};
