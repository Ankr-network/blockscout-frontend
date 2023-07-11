import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { updateWhitelistMode } from 'domains/projects/actions/updateWhitelistMode';
import { useCreateJwtToken } from 'domains/jwtToken/hooks/useCreateJwtToken';
import { usdTopUpFetchLinkForOneTimePayment } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { useEnableWhitelist } from 'domains/projects/hooks/useEnableWhitelist';

export const useIsLoading = () => {
  const [, { isLoading: isUpdateWhitelistModeLoading }] =
    useQueryEndpoint(updateWhitelistMode);
  const { isLoading: isCreateJwtTokenLoading } = useCreateJwtToken();
  const [, { isLoading: isFetchLinkForOneTimePaymentLoading }] =
    useQueryEndpoint(usdTopUpFetchLinkForOneTimePayment);
  const { isLoading: isWhitelistEnablingLoading } = useEnableWhitelist();

  return (
    isUpdateWhitelistModeLoading ||
    isCreateJwtTokenLoading ||
    isFetchLinkForOneTimePaymentLoading ||
    isWhitelistEnablingLoading
  );
};
