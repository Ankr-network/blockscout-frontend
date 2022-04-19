import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { DefaultLayout } from '../../../layout/components/DefautLayout';
import { Spinner } from 'ui';
import { useProvider } from 'modules/auth/hooks/useProvider';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { ChainPrivateRoutes } from 'domains/chains/Routes';

export const GuardProviderRoute = ({ ...routeProps }: RouteProps) => {
  const { credentials, loading: authLoading } = useAuth();

  const { handleFetchProvider, providerData, loading } = useProvider();

  useEffect(() => {
    if (credentials) {
      handleFetchProvider();
    }
  }, [credentials, handleFetchProvider]);

  if (loading || authLoading) {
    return (
      <DefaultLayout>
        <Spinner />
      </DefaultLayout>
    );
  }

  if (credentials && providerData && typeof providerData !== 'string') {
    return (
      <DefaultLayout>
        <ChainPrivateRoutes />
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} />;
};
