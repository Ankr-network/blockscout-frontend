import { ChainID } from '@ankr.com/chains-list';

import { ChainsRoutesConfig } from 'domains/chains/routes';

export const useNetId = () => {
  const { netId } = ChainsRoutesConfig.chainDetails.useParams();

  return netId as ChainID | undefined;
};
