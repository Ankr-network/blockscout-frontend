import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
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

  const { address } = useAuth(AvailableWriteProviders.ethCompatible);

  const { data: partnerCode } = useQuery({ type: getPartnerCode });

  useProviderEffect(() => {
    if (address) {
      dispatchRequest(getPartnerCode(address));
    }

    if (!partnerCode || partnerCode === NOT_PARTNER_CODE) {
      history.push(DashboardRoutesConfig.dashboard.generatePath());
    }
  }, [address, history, partnerCode]);

  return <>{children}</>;
};
