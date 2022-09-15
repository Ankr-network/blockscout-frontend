import { ChainsRoutesConfig } from 'domains/chains/routes';
import { ChainID } from 'modules/chains/types';

export const useNetId = () => {
  const { netId } = ChainsRoutesConfig.chainDetails.useParams();

  return netId as ChainID | undefined;
};
