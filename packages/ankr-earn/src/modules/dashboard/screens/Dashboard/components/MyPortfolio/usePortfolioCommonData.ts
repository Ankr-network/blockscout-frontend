import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getPartnerCode } from 'modules/referrals/actions/getPartnerCode';
import { NOT_PARTNER_CODE } from 'modules/referrals/api/const';

export interface IUsePortfolioCommonData {
  isCurrentAccountPartner: boolean;
}

export const usePortfolioCommonData = (): IUsePortfolioCommonData => {
  const dispatch = useDispatchRequest();

  const { data } = useQuery({ type: getPartnerCode });

  const { address } = useConnectedData(AvailableWriteProviders.ethCompatible);

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
