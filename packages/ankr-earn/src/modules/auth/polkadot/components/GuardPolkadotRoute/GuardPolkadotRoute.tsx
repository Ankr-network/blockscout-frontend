import { Route, RouteProps } from 'react-router';

import { ConnectionGuard } from 'modules/auth/common/components/ConnectionGuard';

import { useGuardPolkadotRoute } from './useGuardPolkadotRoute';

interface IGuardPolkadotRouteProps extends RouteProps {
  isOpenConnectInstantly?: boolean;
}

export const GuardPolkadotRoute = ({
  isOpenConnectInstantly = true,
  ...routeProps
}: IGuardPolkadotRouteProps): JSX.Element => {
  const { handleOpen, isConnected } = useGuardPolkadotRoute({
    isOpenConnectInstantly,
  });

  return (
    <ConnectionGuard isConnected={isConnected} onConnectClick={handleOpen}>
      <Route {...routeProps} />
    </ConnectionGuard>
  );
};
