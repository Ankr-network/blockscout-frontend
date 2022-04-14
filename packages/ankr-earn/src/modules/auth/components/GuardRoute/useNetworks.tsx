import { BlockchainNetworkId } from 'modules/common/types';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { DotIcon } from 'uiKit/Icons/DotIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { KsmIcon } from 'uiKit/Icons/KsmIcon';
import { PolygonIcon } from 'uiKit/Icons/Polygon';

import { ReactComponent as AvaxIcon } from '../../assets/avaxIcon.svg';
import { ReactComponent as BinanceSmartChainIcon } from '../../assets/binanceSmartChainIcon.svg';
import { ReactComponent as EthereumMainnetIcon } from '../../assets/ethereumMainnetIcon.svg';

export interface INetwork {
  title: string;
  icon: JSX.Element;
  chainId: BlockchainNetworkId;
}

export const useNetworks = (): INetwork[] =>
  useLocaleMemo(
    () => [
      // ETH Compatible
      {
        title: t('connect.networks.ethereum-mainnet'),
        icon: <EthereumMainnetIcon />,
        chainId: BlockchainNetworkId.mainnet,
      },
      {
        title: t('connect.networks.ethereum-goerli'),
        icon: <EthereumMainnetIcon />,
        chainId: BlockchainNetworkId.goerli,
      },
      {
        title: t('connect.networks.binance-smart-chain'),
        icon: <BinanceSmartChainIcon />,
        chainId: BlockchainNetworkId.smartchain,
      },
      {
        title: t('connect.networks.smart-chain-testnet'),
        icon: <BinanceSmartChainIcon />,
        chainId: BlockchainNetworkId.smartchainTestnet,
      },
      {
        title: t('connect.networks.avax-chain'),
        icon: <AvaxIcon />,
        chainId: BlockchainNetworkId.avalanche,
      },
      {
        title: t('connect.networks.avax-fuji-testnet'),
        icon: <AvaxIcon />,
        chainId: BlockchainNetworkId.avalancheTestnet,
      },
      {
        title: t('connect.networks.fantom'),
        icon: <FantomIcon htmlColor="#1969FF" size="xmd" />,
        chainId: BlockchainNetworkId.fantom,
      },
      {
        title: t('connect.networks.fantom-testnet'),
        icon: <FantomIcon htmlColor="#1969FF" size="xmd" />,
        chainId: BlockchainNetworkId.fantomTestnet,
      },
      {
        title: t('connect.networks.polygon'),
        icon: <PolygonIcon size="xmd" />,
        chainId: BlockchainNetworkId.polygon,
      },
      {
        title: t('connect.networks.mumbai'),
        icon: <PolygonIcon size="xmd" />,
        chainId: BlockchainNetworkId.mumbai,
      },

      // Polkadot Compatible
      {
        title: t('connect.networks.polkadot'),
        icon: <DotIcon />,
        chainId: BlockchainNetworkId.polkadot,
      },
      {
        title: t('connect.networks.kusama'),
        icon: <KsmIcon />,
        chainId: BlockchainNetworkId.kusama,
      },
      {
        title: t('connect.networks.westend'),
        icon: <DotIcon />,
        chainId: BlockchainNetworkId.westend,
      },
      {
        title: t('connect.networks.rococo'),
        icon: <DotIcon />,
        chainId: BlockchainNetworkId.rococo,
      },
    ],
    [],
  );
