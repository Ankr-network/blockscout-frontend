import { Route, RouteProps } from 'react-router';

import { EEthereumNetworkId, EWalletId } from '@ankr.com/provider';

import { ConnectionGuard } from 'modules/auth/common/components/ConnectionGuard';

import { ChainGuard } from '../ChainGuard';
import { WalletGuard } from '../WalletGuard';

import { useGuardETHRoute } from './useGuardETHRoute';

interface IGuardETHRouteProps extends RouteProps {
  availableNetworks: EEthereumNetworkId[];
  notSupportedWallets?: EWalletId[];
  supportSlot?: JSX.Element;
  isOpenConnectInstantly?: boolean;
}

export const GuardETHRoute = ({
  availableNetworks,
  notSupportedWallets,
  supportSlot,
  isOpenConnectInstantly = true,
  ...routeProps
}: IGuardETHRouteProps): JSX.Element => {
  const {
    isConnected,
    chainId,
    isSwitchNetworkLoading,
    walletId,
    isInjectedWallet,
    onNetworkSwitch,
    handleOpen,
  } = useGuardETHRoute({ isOpenConnectInstantly });

  return (
    <ConnectionGuard isConnected={isConnected} onConnectClick={handleOpen}>
      <WalletGuard
        currentWalletId={walletId}
        notSupportedWallets={notSupportedWallets}
        supportSlot={supportSlot}
      >
        <ChainGuard
          availableNetworks={availableNetworks}
          currentNetworkId={chainId as number | undefined}
          isLoading={isSwitchNetworkLoading}
          isSwitchSupported={isInjectedWallet}
          onNetworkSwitch={onNetworkSwitch}
        >
          <Route {...routeProps} />
        </ChainGuard>
      </WalletGuard>
    </ConnectionGuard>
  );
};
