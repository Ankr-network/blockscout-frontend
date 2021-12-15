import React from 'react';
import { ReactComponent as AvaxcIcon } from '../../common/assets/avaxcIcon.svg';
import { ReactComponent as BinanceSmartChainIcon } from '../../common/assets/binanceSmartChainIcon.svg';
import { ReactComponent as EthereumMainnetIcon } from '../../common/assets/ethereumMainnetIcon.svg';
import { useLocaleMemo } from '../../common/hooks/useLocaleMemo';
import { BlockchainNetworkId } from '../../common/types';
import { t } from '../../common/utils/intl';

export interface INetwork {
  title: string;
  icon: JSX.Element;
  chainId: BlockchainNetworkId;
}

export const useNetworks = (): INetwork[] =>
  useLocaleMemo(
    () => [
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
        icon: <AvaxcIcon />,
        chainId: BlockchainNetworkId.avalanche,
      },
      {
        title: t('connect.networks.avax-fuji-testnet'),
        icon: <AvaxcIcon />,
        chainId: BlockchainNetworkId.avalancheTestnet,
      },
    ],
    [],
  );
