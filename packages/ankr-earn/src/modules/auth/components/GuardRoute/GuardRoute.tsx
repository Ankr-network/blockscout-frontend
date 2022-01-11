import { Connect } from 'modules/auth/components/Connect';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { AvailableProviders } from 'provider/providerManager/types';
import { useEffect } from 'react';
import { Route, RouteProps } from 'react-router';

interface IGuardRouteProps extends RouteProps {
  providerId: AvailableProviders;
  openConnectInstantly?: boolean;
}

export const GuardRoute = ({
  providerId,
  openConnectInstantly = false,
  ...routeProps
}: IGuardRouteProps) => {
  const { isConnected, dispatchConnect } = useAuth(providerId);

  useEffect(() => {
    if (!isConnected && openConnectInstantly) dispatchConnect();
  }, [openConnectInstantly, isConnected, dispatchConnect]);

  if (isConnected) {
    return <Route {...routeProps} />;
  }

  return (
    <DefaultLayout verticalAlign="center">
      <Connect onConnectClick={dispatchConnect} />
    </DefaultLayout>
  );
};
