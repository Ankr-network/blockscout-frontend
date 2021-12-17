import { Connect } from 'modules/auth/components/Connect';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { requiredProvider } from 'modules/stake-demo/const';
import { Route, RouteProps } from 'react-router';

export const GuardRoute = ({ ...routeProps }: RouteProps) => {
  const { isConnected, dispatchConnect } = useAuth(requiredProvider);

  if (isConnected) {
    return <Route {...routeProps} />;
  }

  return (
    <DefaultLayout verticalAlign="center">
      <Connect onConnectClick={dispatchConnect} />
    </DefaultLayout>
  );
};
