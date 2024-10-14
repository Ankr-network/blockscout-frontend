import { usdTopUpFetchLinkForOneTimePayment } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { useAddBlockchainsToWhitelistMutation } from 'domains/projects/actions/addBlockchainsToWhitelist';
import { useCreateJwtToken } from 'domains/jwtToken/hooks/useCreateJwtToken';
import { useEnableWhitelist } from 'domains/projects/hooks/useEnableWhitelist';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { ENABLE_WHITELISTS_CACHE_KEY } from '../../../const';

export const useIsLoading = () => {
  const { isLoading: isCreateJwtTokenLoading } = useCreateJwtToken({
    cacheKey: ENABLE_WHITELISTS_CACHE_KEY,
  });
  const [, { isLoading: isFetchLinkForOneTimePaymentLoading }] =
    useQueryEndpoint(usdTopUpFetchLinkForOneTimePayment);
  const { isLoading: isWhitelistEnablingLoading } = useEnableWhitelist();
  const [, { isLoading: isBlockchainsBindingLoading }] =
    useAddBlockchainsToWhitelistMutation({
      fixedCacheKey: ENABLE_WHITELISTS_CACHE_KEY,
    });

  return (
    isCreateJwtTokenLoading ||
    isFetchLinkForOneTimePaymentLoading ||
    isWhitelistEnablingLoading ||
    isBlockchainsBindingLoading
  );
};
