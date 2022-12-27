import { Route, RouteProps } from 'react-router-dom';
import { Spinner } from 'ui';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { isInvitation } from './utils/isInvitation';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export interface IGuardAuthUserSettingsRoute extends RouteProps {
  hasAuthData: boolean;
  authorizedRender: JSX.Element;
}

export const GuardAuthUserSettingsRoute = ({
  hasAuthData,
  authorizedRender,
  ...routeProps
}: IGuardAuthUserSettingsRoute) => {
  const { hasPrivateAccess, address, loading } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();

  useOnMount(() => {
    if (!address || !hasPrivateAccess) setBreadcrumbs([]);
  });

  if (loading) {
    return (
      <DefaultLayout>
        <Spinner />
      </DefaultLayout>
    );
  }

  if (hasAuthData || isInvitation(routeProps)) {
    return authorizedRender;
  }

  return <Route {...routeProps} />;
};
