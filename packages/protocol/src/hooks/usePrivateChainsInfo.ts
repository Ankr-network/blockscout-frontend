import { useUserEndpointToken } from 'domains/chains/hooks/useUserEndpointToken';
import {
  selectBlockchainsLoadingStatus,
  selectConfiguredBlockchainsForToken,
} from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export const usePrivateChainsInfo = () => {
  const userEndpointToken = useUserEndpointToken();

  const chains = useAppSelector(state =>
    selectConfiguredBlockchainsForToken(state, userEndpointToken),
  );
  const isLoading = useAppSelector(selectBlockchainsLoadingStatus);

  return { chains, isLoading };
};
