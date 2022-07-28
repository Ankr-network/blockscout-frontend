import arbitrumIcon from './arbitrum.svg';
import avaxIcon from './avax.svg';
import bscIcon from './bsc.svg';
import celoIcon from './celo.svg';
import defaultIcon from './default-icon.svg';
import ethIcon from './eth.svg';
import ftmIcon from './ftm.svg';
import gnosisIcon from './gnosis.svg';
import harmonyIcon from './harmony.svg';
import iotexIcon from './iotex.svg';
import ksmIcon from './ksm.svg';
import moonbeamIcon from './moonbeam.svg';
import nearIcon from './near.svg';
import nervosIcon from './nervos.svg';
import optimisimIcon from './optimism.svg';
import solIcon from './sol.svg';
import stakeIcon from './stake.svg';
import syscoinIcon from './syscoin.svg';
import tronIcon from './tron.svg';
import bttcIcon from './bttc.svg';

const chainIcons = {
  arbitrum: arbitrumIcon,
  avalanche: avaxIcon,
  bsc: bscIcon,
  celo: celoIcon,
  eth: ethIcon,
  fantom: ftmIcon,
  gnosis: gnosisIcon,
  harmony: harmonyIcon,
  iotex: iotexIcon,
  moonbeam: moonbeamIcon,
  near: nearIcon,
  nervos_gw: nervosIcon,
  nervos: nervosIcon,
  optimism: optimisimIcon,
  polygon: ksmIcon,
  solana: solIcon,
  syscoin: syscoinIcon,
  xdai: stakeIcon,
  tron: tronIcon,
  bttc: bttcIcon,
};

export function getChainIcon(name: string) {
  return chainIcons[name as keyof typeof chainIcons] || defaultIcon;
}
