import { Route, RouteProps } from 'react-router';

import { ConnectionGuard } from 'modules/auth/common/components/ConnectionGuard';

import { useGuardSuiRoute } from './useGuardSuiRoute';

interface IGuardSuiRouteProps extends RouteProps {
  isOpenConnectInstantly?: boolean;
}

export const GuardSuiRoute = ({
  isOpenConnectInstantly = true,
  ...routeProps
}: IGuardSuiRouteProps): JSX.Element => {
  const { handleOpen, isConnected } = useGuardSuiRoute({
    isOpenConnectInstantly,
  });

  return (
    <ConnectionGuard isConnected={isConnected} onConnectClick={handleOpen}>
      <Route {...routeProps} />
    </ConnectionGuard>
  );
};
