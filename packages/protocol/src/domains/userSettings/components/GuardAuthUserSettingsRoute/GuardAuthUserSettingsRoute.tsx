import { Route, RouteProps } from 'react-router-dom';
import { OverlaySpinner } from '@ankr.com/ui';
import { useMemo } from 'react';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { UserSettingsRoutes } from 'domains/userSettings/Routes';
import { isReactSnap } from 'modules/common/utils/isReactSnap';

import { isInvitation } from './utils/isInvitation';

export interface IGuardAuthUserSettingsRoute extends RouteProps {
  hasAuthData: boolean;
}

export const GuardAuthUserSettingsRoute = ({
  hasAuthData,
  location,
  ...routeProps
}: IGuardAuthUserSettingsRoute) => {
  const { hasPrivateAccess, address, loading } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();
  const hasInvitation = useMemo(
    () => !isReactSnap && isInvitation(location),
    [location],
  );

  useOnMount(() => {
    if (!address || !hasPrivateAccess) setBreadcrumbs([]);
  });

  if (loading) {
    return (
      <DefaultLayout>
        <OverlaySpinner />
      </DefaultLayout>
    );
  }

  if (hasAuthData || hasInvitation) {
    return (
      <DefaultLayout>
        <UserSettingsRoutes />
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} location={location} />;
};
