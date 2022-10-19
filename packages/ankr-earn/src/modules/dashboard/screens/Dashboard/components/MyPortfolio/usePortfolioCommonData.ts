import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getPartnerCode } from 'modules/referrals/actions/getPartnerCode';
import { NOT_PARTNER_CODE } from 'modules/referrals/api/const';

export interface IUsePortfolioCommonData {
  isCurrentAccountPartner: boolean;
}

export const usePortfolioCommonData = (): IUsePortfolioCommonData => {
  const dispatch = useDispatchRequest();

  const { data } = useQuery({ type: getPartnerCode });

  const { address } = useAuth(AvailableWriteProviders.ethCompatible);

  useProviderEffect(() => {
    if (address) {
      dispatch(getPartnerCode(address));
    }
  }, [address, dispatch]);

  const isCurrentAccountPartner = data ? data !== NOT_PARTNER_CODE : false;

  return {
    isCurrentAccountPartner,
  };
};
