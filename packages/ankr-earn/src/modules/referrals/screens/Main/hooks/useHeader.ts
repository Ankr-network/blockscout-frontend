import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useState, useCallback, useEffect } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getPartnerCode } from 'modules/referrals/actions/getPartnerCode';
import { getRefLink } from 'modules/referrals/utils/getRefLink';

export interface IHeaderData {
  refLLink: string;
  loading: boolean;
  isRefLinkCopied: boolean;
  handleCopyRefLink: () => void;
}

const TIMEOUT = 1_500;

export const useHeader = (): IHeaderData => {
  const dispatchRequest = useDispatchRequest();

  const { address } = useAuth(AvailableWriteProviders.ethCompatible);

  const { data, loading } = useQuery({ type: getPartnerCode });

  const [isRefLinkCopied, setIsRefLinkCopied] = useState(false);

  const handleCopyRefLink = useCallback(() => {
    setIsRefLinkCopied(isCopied => !isCopied);
  }, [setIsRefLinkCopied]);

  useProviderEffect(() => {
    if (address) {
      dispatchRequest(getPartnerCode(address));
    }
  }, []);

  useEffect(() => {
    if (!isRefLinkCopied) {
      return undefined;
    }

    const timeoutId = setTimeout(handleCopyRefLink, TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [isRefLinkCopied, handleCopyRefLink]);

  return {
    refLLink: getRefLink(data),
    loading,
    isRefLinkCopied,
    handleCopyRefLink,
  };
};
