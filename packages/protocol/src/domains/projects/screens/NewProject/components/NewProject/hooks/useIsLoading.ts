import {
  CACHE_KEY_ENABLE_WHITELISTS,
  useAddBlockchainsToWhitelistMutation,
} from 'domains/projects/actions/addBlockchainsToWhitelist';
import { updateWhitelistMode } from 'domains/projects/actions/updateWhitelistMode';
import { usdTopUpFetchLinkForOneTimePayment } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { useAddToWhitelistMutation } from 'domains/projects/actions/addToWhitelist';
import { useCreateJwtToken } from 'domains/jwtToken/hooks/useCreateJwtToken';
import { useEnableWhitelist } from 'domains/projects/hooks/useEnableWhitelist';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const useIsLoading = () => {
  const [, { isLoading: isUpdateWhitelistModeLoading }] =
    useQueryEndpoint(updateWhitelistMode);
  const { isLoading: isCreateJwtTokenLoading } = useCreateJwtToken();
  const [, { isLoading: isFetchLinkForOneTimePaymentLoading }] =
    useQueryEndpoint(usdTopUpFetchLinkForOneTimePayment);
  const { isLoading: isWhitelistEnablingLoading } = useEnableWhitelist();
  const [, { isLoading: isAddToWhitelistLoading }] =
    useAddToWhitelistMutation();
  const [, { isLoading: isBlockchainsBindingLoading }] =
    useAddBlockchainsToWhitelistMutation({
      fixedCacheKey: CACHE_KEY_ENABLE_WHITELISTS,
    });

  return (
    isUpdateWhitelistModeLoading ||
    isCreateJwtTokenLoading ||
    isFetchLinkForOneTimePaymentLoading ||
    isWhitelistEnablingLoading ||
    isAddToWhitelistLoading ||
    isBlockchainsBindingLoading
  );
};
