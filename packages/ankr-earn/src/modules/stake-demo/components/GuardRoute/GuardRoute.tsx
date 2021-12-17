import { Connect } from 'modules/auth/components/Connect';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { BlockchainNetworkId } from 'modules/common/types';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { Route, RouteProps } from 'react-router';

const requiredChainId = BlockchainNetworkId.mainnet;

export const GuardRoute = ({ ...routeProps }: RouteProps) => {
  const { isConnected, dispatchConnect } = useAuth(requiredChainId);

  if (isConnected) {
    return <Route {...routeProps} />;
  }

  return (
    <DefaultLayout verticalAlign="center">
      <Connect onConnectClick={dispatchConnect} />
    </DefaultLayout>
  );
};
