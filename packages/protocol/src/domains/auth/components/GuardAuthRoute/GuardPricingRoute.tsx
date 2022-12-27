import { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useHistory } from 'react-router';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { AccountRoutes, PATH_ACCOUNT } from 'domains/account/Routes';
import { Themes } from 'ui';

export interface IGuardRoute extends RouteProps {
  hasPremium: boolean;
}

export const GuardPricingRoute = ({
  hasPremium,
  ...routeProps
}: IGuardRoute) => {
  const { address } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();
  const history = useHistory();

  useEffect(() => {
    if (hasPremium) {
      history.replace(PATH_ACCOUNT);
    }
  }, [history, hasPremium]);

  useOnMount(() => {
    if (!address || !hasPremium) setBreadcrumbs([]);
  });

  if (hasPremium) {
    return (
      <DefaultLayout theme={Themes.light}>
        <AccountRoutes />
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} />;
};
