import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Mutation } from '@redux-requests/react';
import { connect } from '../../actions/connect';
import { DefaultLayout } from '../../../layout/components/DefautLayout';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@material-ui/core';
import { t } from '../../../i18n/utils/intl';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { Deposit } from '../../../../domains/plan/screens/Plan/components/Deposit';

export interface IGuardRoute extends RouteProps {}

export const GuardAuthRoute = ({ ...routeProps }: IGuardRoute) => {
  const { handleConnect, credentials, address, handleDeposit } = useAuth();

  const { setBreadcrumbs } = useBreadcrumbs();

  useOnMount(() => {
    if (!address || !credentials) setBreadcrumbs([]);
  });

  if (!address) {
    return (
      <DefaultLayout>
        <Mutation type={connect.toString()}>
          {({ loading }) => (
            <Button color="primary" onClick={handleConnect} disabled={loading}>
              {t('guard-auth-route.connect')}
            </Button>
          )}
        </Mutation>
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
