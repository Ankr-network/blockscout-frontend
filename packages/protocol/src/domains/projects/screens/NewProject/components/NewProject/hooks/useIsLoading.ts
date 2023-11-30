import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { updateWhitelistMode } from 'domains/projects/actions/updateWhitelistMode';
import { useCreateJwtToken } from 'domains/jwtToken/hooks/useCreateJwtToken';
import { usdTopUpFetchLinkForOneTimePayment } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { useEnableWhitelist } from 'domains/projects/hooks/useEnableWhitelist';
import { addToWhitelist } from 'domains/projects/actions/addToWhitelist';
import {
  CACHE_KEY_ENABLE_WHITELISTS,
  useAddBlockchainsToWhitelistMutation,
} from 'domains/projects/actions/addBlockchainsToWhitelist';

export const useIsLoading = () => {
  const [, { isLoading: isUpdateWhitelistModeLoading }] =
    useQueryEndpoint(updateWhitelistMode);
  const { isLoading: isCreateJwtTokenLoading } = useCreateJwtToken();
  const [, { isLoading: isFetchLinkForOneTimePaymentLoading }] =
    useQueryEndpoint(usdTopUpFetchLinkForOneTimePayment);
  const { isLoading: isWhitelistEnablingLoading } = useEnableWhitelist();
  const [, { isLoading: isAddToWhitelistLoading }] =
    useQueryEndpoint(addToWhitelist);
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
