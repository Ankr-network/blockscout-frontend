import { ReactComponent as AvaxChainIcon } from 'assets/img/avax-chain-icon.svg';
import { ReactComponent as BinanceSmartChainIcon } from 'assets/img/binance-smart-chain-icon.svg';
import { ReactComponent as EthereumMainnetIcon } from 'assets/img/ethereum-mainnet-icon.svg';
import { BlockchainNetworkId } from 'modules/common/types';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';

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
        icon: <AvaxChainIcon />,
        chainId: BlockchainNetworkId.avalanche,
      },
      {
        title: t('connect.networks.avax-fuji-testnet'),
        icon: <AvaxChainIcon />,
        chainId: BlockchainNetworkId.avalancheTestnet,
      },
    ],
    [],
  );
