import React, { useEffect, useMemo } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useHistory } from 'react-router';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { AccountRoutes, PATH_ACCOUNT } from 'domains/account/Routes';
import { Themes } from 'ui';

export interface IGuardRoute extends RouteProps {
  hasCredentials: boolean;
  isManualConnected: boolean;
}

export const GuardPricingRoute = ({
  hasCredentials,
  isManualConnected,
  ...routeProps
}: IGuardRoute) => {
  const { address } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();
  const history = useHistory();
  const shouldReplace = useMemo(
    () => hasCredentials && isManualConnected,
    [hasCredentials, isManualConnected],
  );

  useEffect(() => {
    if (shouldReplace) {
      history.replace(PATH_ACCOUNT);
    }
  }, [history, shouldReplace]);

  useOnMount(() => {
    if (!address || !hasCredentials) setBreadcrumbs([]);
  });

  if (shouldReplace) {
    return (
      <DefaultLayout theme={Themes.light}>
        <AccountRoutes />
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} />;
};
