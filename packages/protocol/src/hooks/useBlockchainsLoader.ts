import { useChainsFetchBlockchainsQuery } from 'modules/chains/actions/fetchBlockchains';
import { useChainsFetchChainNodesDetailQuery } from 'modules/chains/actions/fetchChainNodesDetail';

export const useBlockchainsLoader = () => {
  useChainsFetchBlockchainsQuery();
  useChainsFetchChainNodesDetailQuery();
};
