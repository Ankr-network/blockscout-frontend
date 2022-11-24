import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import { ReactComponent as AvaxIcon } from 'modules/auth/common/assets/avaxIcon.svg';
import { ReactComponent as BinanceSmartChainIcon } from 'modules/auth/common/assets/binanceSmartChainIcon.svg';
import { ReactComponent as EthereumMainnetIcon } from 'modules/auth/common/assets/ethereumMainnetIcon.svg';
import { EEthereumNetworkId } from 'modules/common/types';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { GnosisIcon } from 'uiKit/Icons/Gnosis';
import { PolygonIcon } from 'uiKit/Icons/Polygon';

export interface IETHNetwork {
  chainId: EEthereumNetworkId;
  icon: JSX.Element;
  title: string;
}

interface IUseETHNetworks {
  networks: IETHNetwork[];
  getNetworkData: (networkId: EEthereumNetworkId) => IETHNetwork;
}

export const useETHNetworks = (): IUseETHNetworks => {
  const networks = useLocaleMemo<IETHNetwork[]>(
    () => [
      {
        title: t('connect.networks.ethereum-mainnet'),
        icon: <EthereumMainnetIcon />,
        chainId: EEthereumNetworkId.mainnet,
      },
      {
        title: t('connect.networks.ethereum-goerli'),
        icon: <EthereumMainnetIcon />,
        chainId: EEthereumNetworkId.goerli,
      },
      {
        title: t('connect.networks.binance-smart-chain'),
        icon: <BinanceSmartChainIcon />,
        chainId: EEthereumNetworkId.smartchain,
      },
      {
        title: t('connect.networks.smart-chain-testnet'),
        icon: <BinanceSmartChainIcon />,
        chainId: EEthereumNetworkId.smartchainTestnet,
      },
      {
        title: t('connect.networks.avax-chain'),
        icon: <AvaxIcon />,
        chainId: EEthereumNetworkId.avalanche,
      },
      {
        title: t('connect.networks.avax-fuji-testnet'),
        icon: <AvaxIcon />,
        chainId: EEthereumNetworkId.avalancheTestnet,
      },
      {
        title: t('connect.networks.fantom'),
        icon: <FantomIcon htmlColor="#1969FF" size="xmd" />,
        chainId: EEthereumNetworkId.fantom,
      },
      {
        title: t('connect.networks.fantom-testnet'),
        icon: <FantomIcon htmlColor="#1969FF" size="xmd" />,
        chainId: EEthereumNetworkId.fantomTestnet,
      },
      {
        title: t('connect.networks.polygon'),
        icon: <PolygonIcon size="xmd" />,
        chainId: EEthereumNetworkId.polygon,
      },
      {
        title: t('connect.networks.mumbai'),
        icon: <PolygonIcon size="xmd" />,
        chainId: EEthereumNetworkId.mumbai,
      },
      {
        title: t('connect.networks.gnosis'),
        icon: <GnosisIcon size="xmd" />,
        chainId: EEthereumNetworkId.gnosis,
      },
      {
        title: t('connect.networks.sokol'),
        icon: <GnosisIcon size="xmd" />,
        chainId: EEthereumNetworkId.sokol,
      },
    ],
    [],
  );

  const getNetworkData = useCallback(
    (networkId: EEthereumNetworkId) =>
      networks.find(network => network.chainId === networkId) as IETHNetwork,
    [networks],
  );

  return { networks, getNetworkData };
};
