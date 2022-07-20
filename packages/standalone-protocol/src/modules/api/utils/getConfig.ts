import { ChainId } from 'domains/chains/api/chain';
import { API_ENV } from 'modules/common/utils/environment';
import { configFromEnv } from 'multirpc-sdk';

const { REACT_APP_CHAIN_ID, REACT_APP_IS_BUILD_FOR_ERIGON_WITH_HOMEPAGE } =
  process.env;

export const getConfig = () => {
  const config = configFromEnv(API_ENV);

  let workerUrl = '/';

  const isBuildForErigonWithHomepage =
    REACT_APP_CHAIN_ID === ChainId.Erigonbsc &&
    REACT_APP_IS_BUILD_FOR_ERIGON_WITH_HOMEPAGE;

  if (!REACT_APP_CHAIN_ID || isBuildForErigonWithHomepage) {
    workerUrl = config.workerUrl;
  }

  return {
    ...config,
    workerUrl,
  };
};
