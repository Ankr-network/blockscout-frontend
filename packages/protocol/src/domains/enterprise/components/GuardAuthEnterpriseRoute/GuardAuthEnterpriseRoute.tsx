import { ReactNode, useEffect } from 'react';
import { useHistory } from 'react-router';
import { INDEX_PATH } from 'routes/constants';

import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { removeCanonicalTag } from 'uiKit/utils/metatags/removeCanonicalTag';

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
      removeCanonicalTag();
      history.replace(INDEX_PATH);
    }
  }, [history, isEnterpriseClient, isEnterpriseStatusLoading]);

  return isEnterpriseClient || isReactSnap ? <>{children}</> : null;
};
