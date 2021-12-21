import { Connect } from 'modules/auth/components/Connect';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { AvailableProviders } from 'provider/providerManager/types';
import { Route, RouteProps } from 'react-router';

interface IGuardRouteProps extends RouteProps {
  providerId: AvailableProviders;
}

export const GuardRoute = ({ providerId, ...routeProps }: IGuardRouteProps) => {
  const { isConnected, dispatchConnect } = useAuth(providerId);

  if (isConnected) {
    return <Route {...routeProps} />;
  }

  return (
    <DefaultLayout verticalAlign="center">
      <Connect onConnectClick={dispatchConnect} />
    </DefaultLayout>
  );
};
