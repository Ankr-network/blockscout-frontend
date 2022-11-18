import { TActionPromise } from 'modules/common/types/ReduxRequests';

import { IConnect } from '../../actions/connect';

export type TNetworkId = number | string;

export interface INetworkItem<NetworkId extends TNetworkId> {
  chainId: NetworkId;
  icon: JSX.Element;
  title: string;
}

export interface IUseGuardRouteProps<NetworkId extends TNetworkId> {
  availableNetworks: NetworkId[];
  isOpenedConnectModal?: boolean;
}

export interface IUseGuardRouteData<
  NetworkId extends TNetworkId,
  SupportedNetworkItem extends INetworkItem<NetworkId>,
> {
  currentNetwork?: string;
  isConnected: boolean;
  isLoading: boolean;
  isUnsupportedNetwork: boolean;
  isValidWallet: boolean;
  supportedNetworks: SupportedNetworkItem[];
  onDispatchConnect: () => TActionPromise<IConnect>;
  onOpenModal: () => void;
  onSwitchNetwork: (network: NetworkId) => () => Promise<void>;
}
