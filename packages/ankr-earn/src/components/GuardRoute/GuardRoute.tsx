import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { DefaultLayout } from '../../modules/layout/components/DefautLayout';
import { Connect } from '../Connect';
import { NetworkSelector } from '../NetworkSelector';
import { UnsupportedNetwork } from '../UnsupportedNetwork';
import { useGuardRoute } from './useGuardRoute';

export interface IGuardRoute extends RouteProps {
  availableNetworks: number[];
}

export const GuardRoute = ({
  availableNetworks,
  ...routeProps
}: IGuardRoute) => {
  const { isAuth, filteredNetworks, isUnsupportedNetwork } = useGuardRoute(
    availableNetworks,
  );

  if (isUnsupportedNetwork) {
    return (
      <DefaultLayout>
        <UnsupportedNetwork
          networksSlot={<NetworkSelector networks={filteredNetworks} />}
        />
      </DefaultLayout>
    );
  }

  if (isAuth) {
    return <Route {...routeProps} />;
  }

  return (
    <DefaultLayout>
      <Connect networks={filteredNetworks} />
    </DefaultLayout>
  );
};
