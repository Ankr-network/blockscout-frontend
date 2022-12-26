import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useProvider } from 'domains/infrastructure/hooks/useProvider';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { Spinner } from 'ui';
import { PageNotFound } from 'modules/router/components/PageNotFound';

export interface IGuardRoute extends RouteProps {}

export const GuardAuthProviderRoute = (props: IGuardRoute) => {
  const { hasPrivateAccess, address, loading, workerTokenData } = useAuth();
  const {
    handleFetchProvider,
    providerData,
    isLoading: providerLoading,
  } = useProvider();
  const { setBreadcrumbs } = useBreadcrumbs();

  useOnMount(() => {
    if (!address || !hasPrivateAccess) setBreadcrumbs([]);
  });

  useEffect(() => {
    if (workerTokenData && !providerData) {
      handleFetchProvider();
    }
  }, [handleFetchProvider, providerData, workerTokenData]);

  if (loading || providerLoading) {
    return (
      <DefaultLayout>
        <Spinner />
      </DefaultLayout>
    );
  }

  if (
    !providerData ||
    (typeof providerData === 'string' && !hasPrivateAccess)
  ) {
    return (
      <DefaultLayout>
        <PageNotFound />
      </DefaultLayout>
    );
  }

  return <Route {...props} />;
};
