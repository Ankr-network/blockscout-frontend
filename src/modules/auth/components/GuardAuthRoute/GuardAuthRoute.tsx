import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Mutation } from '@redux-requests/react';
import { connect } from '../../actions/connect';
import { DefaultLayout } from '../../../layout/components/DefautLayout';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@material-ui/core';
import { t } from '../../../i18n/utils/intl';

export interface IGuardRoute extends RouteProps {}

export const GuardAuthRoute = ({ ...routeProps }: IGuardRoute) => {
  const { handleConnect, credentials, address, handleDeposit } = useAuth();

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
        <Mutation type={connect.toString()}>
          {({ loading }) => (
            <Button color="primary" onClick={handleDeposit} disabled={loading}>
              {t('guard-auth-route.create')}
            </Button>
          )}
        </Mutation>
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} />;
};
