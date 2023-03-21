import { ChainID } from 'modules/chains/types';

import aptosIcon from './icons/aptos.svg';
import arbitrumIcon from './icons/arbitrum.svg';
import arbitrumNovaIcon from './icons/arbitrum-nova.svg';
import avaxIcon from './icons/avax.svg';
import bscIcon from './icons/bsc.svg';
import bttcIcon from './icons/bttc.svg';
import celoIcon from './icons/celo.svg';
import defaultIcon from './icons/default-icon.svg';
import ethIcon from './icons/eth.svg';
import filecoinIcon from './icons/filecoin.svg';
import ftmIcon from './icons/ftm.svg';
import gnosisIcon from './icons/gnosis.svg';
import harmonyIcon from './icons/harmony.svg';
import hecoIcon from './icons/heco.svg';
import iotexIcon from './icons/iotex.svg';
import klaytnIcon from './icons/klaytn.svg';
import kusamaIcon from './icons/kusama.svg';
import metisIcon from './icons/metis.svg';
import moonbeamIcon from './icons/moonbeam.svg';
import multichainIcon from './icons/multichain.svg';
import nearIcon from './icons/near.svg';
import nervosIcon from './icons/nervos.svg';
import optimisimIcon from './icons/optimism.svg';
import polkadotIcon from './icons/polkadot.svg';
import polygonIcon from './icons/polygon.svg';
import polygonZkevmIcon from './icons/polygon-zkevm.svg';
import secretIcon from './icons/secret.svg';
import solIcon from './icons/sol.svg';
import stakeIcon from './icons/stake.svg';
import suiIcon from './icons/sui.svg';
import syscoinIcon from './icons/syscoin.svg';
import tronIcon from './icons/tron.svg';

import arbitrumNovaIconDark from './darkModeIcons/arbitrum-nova.svg';
import bttcIconDark from './darkModeIcons/bttc.svg';
import celoIconDark from './darkModeIcons/celo.svg';
import ethIconDark from './darkModeIcons/eth.svg';
import kusamaIconDark from './darkModeIcons/kusama.svg';
import moonbeamIconDark from './darkModeIcons/moonbeam.svg';
import nearIconDark from './darkModeIcons/near.svg';
import nervosIconDark from './darkModeIcons/nervos.svg';
import secretIconDark from './darkModeIcons/secret.svg';
import solIconDark from './darkModeIcons/sol.svg';
import suiIconDark from './darkModeIcons/sui.svg';

const chainIcons: Partial<Record<ChainID, string>> = {
  [ChainID.APTOS]: aptosIcon,
  [ChainID.ARBITRUM]: arbitrumIcon,
  [ChainID.ARBITRUM_NOVA]: arbitrumNovaIcon,
  [ChainID.AVALANCHE]: avaxIcon,
  [ChainID.BSC]: bscIcon,
  [ChainID.BTTC]: bttcIcon,
  [ChainID.CELO]: celoIcon,
  [ChainID.ETH]: ethIcon,
  [ChainID.FANTOM]: ftmIcon,
  [ChainID.GNOSIS]: gnosisIcon,
  [ChainID.HARMONY]: harmonyIcon,
  [ChainID.HECO]: hecoIcon,
  [ChainID.IOTEX]: iotexIcon,
  [ChainID.KLAYTN]: klaytnIcon,
  [ChainID.KUSAMA]: kusamaIcon,
  [ChainID.METIS]: metisIcon,
  [ChainID.MOONBEAM]: moonbeamIcon,
  [ChainID.MULTICHAIN]: multichainIcon,
  [ChainID.NEAR]: nearIcon,
  [ChainID.NERVOS]: nervosIcon,
  [ChainID.NERVOS_GW]: nervosIcon,
  [ChainID.OPTIMISM]: optimisimIcon,
  [ChainID.POLKADOT]: polkadotIcon,
  [ChainID.POLYGON]: polygonIcon,
  [ChainID.POLYGON_ZKEVM]: polygonZkevmIcon,
  [ChainID.SECRET]: secretIcon,
  [ChainID.SOLANA]: solIcon,
  [ChainID.SYSCOIN]: syscoinIcon,
  [ChainID.TRON]: tronIcon,
  [ChainID.XDAI]: stakeIcon,
  [ChainID.FILECOIN]: filecoinIcon,
  [ChainID.SUI]: suiIcon,
};

const darkModeChainIcons: Partial<Record<ChainID, string>> = {
  ...chainIcons,
  [ChainID.ARBITRUM_NOVA]: arbitrumNovaIconDark,
  [ChainID.BTTC]: bttcIconDark,
  [ChainID.CELO]: celoIconDark,
  [ChainID.ETH]: ethIconDark,
  [ChainID.KUSAMA]: kusamaIconDark,
  [ChainID.MOONBEAM]: moonbeamIconDark,
  [ChainID.NEAR]: nearIconDark,
  [ChainID.NERVOS]: nervosIconDark,
  [ChainID.NERVOS_GW]: nervosIconDark,
  [ChainID.SECRET]: secretIconDark,
  [ChainID.SOLANA]: solIconDark,
  [ChainID.SUI]: suiIconDark,
};

export function getChainIcon(name: string, isLightTheme: boolean) {
  const iconMap = isLightTheme ? chainIcons : darkModeChainIcons;

  return iconMap[name as keyof typeof chainIcons] || defaultIcon;
}
