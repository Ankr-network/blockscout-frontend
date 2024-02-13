import { useChainsFetchBlockchainsQuery } from 'modules/chains/actions/fetchBlockchains';
import { useChainsFetchChainNodesDetailQuery } from 'modules/chains/actions/fetchChainNodesDetail';
import { ACTION_TEN_MINUTES_CACHE } from 'modules/common/constants/const';

export const useBlockchainsLoader = () => {
  useChainsFetchBlockchainsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_TEN_MINUTES_CACHE,
  });
  useChainsFetchChainNodesDetailQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_TEN_MINUTES_CACHE,
  });
};
