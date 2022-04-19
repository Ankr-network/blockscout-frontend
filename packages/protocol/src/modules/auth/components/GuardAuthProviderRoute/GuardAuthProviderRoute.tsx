import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { DefaultLayout } from '../../../layout/components/DefautLayout';
import { useAuth } from '../../hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { Spinner } from 'ui';
import { useProvider } from 'modules/auth/hooks/useProvider';

export interface IGuardRoute extends RouteProps {
  hasCachedCredentials: boolean;
}

export const GuardAuthProviderRoute = ({
  hasCachedCredentials,
  ...routeProps
}: IGuardRoute) => {
  const { credentials, address, loading } = useAuth();
  const {
    handleFetchProvider,
    providerData,
    loading: providerLoading,
  } = useProvider();
  const { setBreadcrumbs } = useBreadcrumbs();

  useOnMount(() => {
    if (!address || !credentials) setBreadcrumbs([]);
  });

  useEffect(() => {
    if (credentials && !providerData) {
      handleFetchProvider();
    }
  }, [credentials, handleFetchProvider, providerData]);

  if (loading || providerLoading) {
    return (
      <DefaultLayout>
        <Spinner />
      </DefaultLayout>
    );
  }

  if (!providerData || (typeof providerData === 'string' && !credentials)) {
    return null;
  }

  return <Route {...routeProps} />;
};
