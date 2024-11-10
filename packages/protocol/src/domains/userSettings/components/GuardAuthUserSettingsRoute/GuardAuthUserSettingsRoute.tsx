import { Route, RouteProps } from 'react-router-dom';
import { OverlaySpinner } from '@ankr.com/ui';
import { useMemo } from 'react';

import { UserSettingsRoutes } from 'domains/userSettings/Routes';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';
import { useOnMount } from 'modules/common/hooks/useOnMount';

import { isInvitation } from './utils/isInvitation';

export interface IGuardAuthUserSettingsRoute extends RouteProps {}

export const GuardAuthUserSettingsRoute = ({
  location,
  ...routeProps
}: IGuardAuthUserSettingsRoute) => {
  const { address, hasPrivateAccess, isLoggedIn, loading } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();
  const hasInvitation = useMemo(
    () => !isReactSnap && isInvitation(location),
    [location],
  );

  useOnMount(() => {
    if (!address || !hasPrivateAccess) setBreadcrumbs([]);
  });

  if (loading) {
    return <OverlaySpinner />;
  }

  if (isLoggedIn || hasInvitation) {
    return <UserSettingsRoutes />;
  }

  return <Route {...routeProps} location={location} />;
};
