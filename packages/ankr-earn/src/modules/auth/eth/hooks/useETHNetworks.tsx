import { t } from 'common';

import { ReactComponent as AvaxIcon } from 'modules/auth/common/assets/avaxIcon.svg';
import { ReactComponent as BinanceSmartChainIcon } from 'modules/auth/common/assets/binanceSmartChainIcon.svg';
import { ReactComponent as EthereumMainnetIcon } from 'modules/auth/common/assets/ethereumMainnetIcon.svg';
import { INetworkItem } from 'modules/auth/common/components/GuardRoute';
import { EEthereumNetworkId } from 'modules/common/types';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { PolygonIcon } from 'uiKit/Icons/Polygon';

export interface IETHNetwork extends INetworkItem<EEthereumNetworkId> {}

export const useETHNetworks = (): IETHNetwork[] =>
  useLocaleMemo(
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
    ],
    [],
  );
