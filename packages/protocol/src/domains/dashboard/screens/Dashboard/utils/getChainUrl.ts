import { Chain } from 'domains/chains/types';
import { getPublicUrl } from 'domains/chains/utils/chainsUtils';

export const getChainUrl = (chain?: Chain) => {
  const url = chain?.urls[0]?.rpc ?? chain?.urls[0]?.rest;

  return url && getPublicUrl(url);
};
