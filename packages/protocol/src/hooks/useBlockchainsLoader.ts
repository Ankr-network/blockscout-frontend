import { useChainsFetchBlockchainsQuery } from 'domains/chains/actions/public/fetchBlockchains';

export const useBlockchainsLoader = () => {
  useChainsFetchBlockchainsQuery();
};
