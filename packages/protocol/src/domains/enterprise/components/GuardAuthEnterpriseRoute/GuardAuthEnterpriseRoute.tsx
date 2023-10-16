import { ReactNode, useEffect } from 'react';
import { useHistory } from 'react-router';

import { INDEX_PATH } from 'domains/chains/routes';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { isReactSnap } from 'modules/common/utils/isReactSnap';

interface IGuardAuthEnterpriseRouteProps {
  children: ReactNode;
}

export const GuardAuthEnterpriseRoute = ({
  children,
}: IGuardAuthEnterpriseRouteProps): JSX.Element | null => {
  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const history = useHistory();

  useEffect(() => {
    if (!isEnterpriseStatusLoading && !isEnterpriseClient && !isReactSnap) {
      history.replace(INDEX_PATH);
    }
  }, [history, isEnterpriseClient, isEnterpriseStatusLoading]);

  return isEnterpriseClient || isReactSnap ? <>{children}</> : null;
};
