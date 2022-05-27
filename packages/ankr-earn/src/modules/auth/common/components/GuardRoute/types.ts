import { AvailableWriteProviders } from 'provider';

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
  providerId: AvailableWriteProviders;
}

export interface IUseGuardRouteData<
  NetworkId extends TNetworkId,
  SupportedNetworkItem extends INetworkItem<NetworkId>,
> {
  currentNetwork?: string;
  isConnected: boolean;
  isLoading: boolean;
  isOpenedModal: boolean;
  isUnsupportedNetwork: boolean;
  isValidWallet: boolean;
  supportedNetworks: SupportedNetworkItem[];
  walletsGroupTypes?: AvailableWriteProviders[];
  onCloseModal: () => void;
  onDispatchConnect: () => TActionPromise<IConnect>;
  onOpenModal: () => void;
  onSwitchNetwork: (network: NetworkId) => () => void;
}
