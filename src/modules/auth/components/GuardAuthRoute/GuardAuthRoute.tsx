import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { DefaultLayout } from '../../../layout/components/DefautLayout';
import { useAuth } from '../../hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ConnectWalletBlock } from 'domains/plan/screens/Plan/components/ConnectWalletBlock';
import { Deposit } from 'domains/plan/screens/Plan/components/Deposit';

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
        <Deposit onSubmit={handleDeposit} />
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} />;
};
