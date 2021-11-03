import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { DefaultLayout } from '../../../layout/components/DefautLayout';
import { useAuth } from '../../hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ConnectWalletBlock } from 'domains/plan/screens/Plan/components/ConnectWalletBlock';
import { Plan } from '../../../../domains/plan/screens/Plan';

export interface IGuardRoute extends RouteProps {}

export const GuardAuthRoute = ({ ...routeProps }: IGuardRoute) => {
  const {
    credentials,
    address,
    handleDeposit,
    handleConnect,
    loading,
  } = useAuth();

  const { setBreadcrumbs } = useBreadcrumbs();

  useOnMount(() => {
    if (!address || !credentials) setBreadcrumbs([]);
  });

  if (!address) {
    return (
      <DefaultLayout>
        <ConnectWalletBlock onClick={handleConnect} isLoading={loading} />
      </DefaultLayout>
    );
  }

  if (!credentials) {
    return (
      <DefaultLayout>
        <Plan />
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} />;
};
