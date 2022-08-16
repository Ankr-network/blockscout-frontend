import { Route, RouteProps } from 'react-router-dom';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { Spinner } from 'ui';

export interface IGuardAuthUserSettingsRoute extends RouteProps {
  hasAuthData: boolean;
  authorizedRender: JSX.Element;
}

export const GuardAuthUserSettingsRoute = ({
  hasAuthData,
  authorizedRender,
  ...routeProps
}: IGuardAuthUserSettingsRoute) => {
  const { credentials, address, loading } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();

  useOnMount(() => {
    if (!address || !credentials) setBreadcrumbs([]);
  });

  if (loading) {
    return (
      <DefaultLayout>
        <Spinner />
      </DefaultLayout>
    );
  }

  if (hasAuthData) {
    return authorizedRender;
  }

  return <Route {...routeProps} />;
};
