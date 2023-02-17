import { ChainID } from 'modules/chains/types';

import aptosIcon from './aptos.svg';
import arbitrumIcon from './arbitrum.svg';
import arbitrumNovaIcon from './arbitrum-nova.svg';
import avaxIcon from './avax.svg';
import bscIcon from './bsc.svg';
import bttcIcon from './bttc.svg';
import celoIcon from './celo.svg';
import defaultIcon from './default-icon.svg';
import ethIcon from './eth.svg';
import ftmIcon from './ftm.svg';
import gnosisIcon from './gnosis.svg';
import harmonyIcon from './harmony.svg';
import hecoIcon from './heco.svg';
import iotexIcon from './iotex.svg';
import klaytnIcon from './klaytn.svg';
import polygonIcon from './polygon.svg';
import kusamaIcon from './kusama.svg';
import metisIcon from './metis.svg';
import moonbeamIcon from './moonbeam.svg';
import multichainIcon from './multichain.svg';
import nearIcon from './near.svg';
import nervosIcon from './nervos.svg';
import optimisimIcon from './optimism.svg';
import polkadotIcon from './polkadot.svg';
import secretIcon from './secret.svg';
import solIcon from './sol.svg';
import stakeIcon from './stake.svg';
import suiIcon from './sui.svg';
import syscoinIcon from './syscoin.svg';
import tronIcon from './tron.svg';
import filecoinIcon from './filecoin.svg';

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
  [ChainID.SECRET]: secretIcon,
  [ChainID.SOLANA]: solIcon,
  [ChainID.SYSCOIN]: syscoinIcon,
  [ChainID.TRON]: tronIcon,
  [ChainID.XDAI]: stakeIcon,
  [ChainID.FILECOIN]: filecoinIcon,
  [ChainID.SUI]: suiIcon,
};

export function getChainIcon(name: string) {
  return chainIcons[name as keyof typeof chainIcons] || defaultIcon;
}
