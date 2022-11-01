import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { RoutesConfig as DashboardRoutesConfig } from 'modules/dashboard/Routes';
import { getPartnerCode } from 'modules/referrals/actions/getPartnerCode';
import { NOT_PARTNER_CODE } from 'modules/referrals/api/const';

interface IReferralGuard {
  children: ReactNode;
}

export const ReferralGuard = ({ children }: IReferralGuard): JSX.Element => {
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();

  const { address } = useConnectedData(AvailableWriteProviders.ethCompatible);

  const { data: partnerCode } = useQuery({ type: getPartnerCode });

  useProviderEffect(() => {
    if (address) {
      dispatchRequest(getPartnerCode(address));
    }

    if (!address || !partnerCode || partnerCode === NOT_PARTNER_CODE) {
      history.push(DashboardRoutesConfig.dashboard.generatePath());
    }
  }, [address, history, partnerCode]);

  return <>{children}</>;
};
