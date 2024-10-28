import { useEffect } from 'react';
import { Web3Address } from 'multirpc-sdk';

import { useLazyFetchReferralCodesQuery } from 'modules/clients/actions/fetchReferralCodes';

interface IReferralCodesProps {
  address: Web3Address;
}

export const useReferralCodes = ({ address }: IReferralCodesProps) => {
  const [fetch, { data = [], isLoading, isFetching }] =
    useLazyFetchReferralCodesQuery();

  useEffect(() => {
    fetch({
      address,
    });
  }, [fetch, address]);

  return {
    referralCodes: data,
    isReferralCodesLoading: isLoading || isFetching,
  };
};
