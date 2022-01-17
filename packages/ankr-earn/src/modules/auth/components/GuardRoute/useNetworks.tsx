import { BlockchainNetworkId } from 'modules/common/types';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
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
    ],
    [],
  );
