import { ChainID } from 'modules/chains/types';
import aptosIcon from './aptos.svg';
import arbitrumIcon from './arbitrum.svg';
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
import ksmIcon from './ksm.svg';
import kusamaIcon from './kusama.svg';
import moonbeamIcon from './moonbeam.svg';
import multichainIcon from './multichain.svg';
import nearIcon from './near.svg';
import nervosIcon from './nervos.svg';
import optimisimIcon from './optimism.svg';
import polkadotIcon from './polkadot.svg';
import secretIcon from './secret.svg';
import solIcon from './sol.svg';
import stakeIcon from './stake.svg';
import syscoinIcon from './syscoin.svg';
import tronIcon from './tron.svg';

const chainIcons: Partial<Record<ChainID, string>> = {
  aptos: aptosIcon,
  arbitrum: arbitrumIcon,
  avalanche: avaxIcon,
  bsc: bscIcon,
  bttc: bttcIcon,
  celo: celoIcon,
  eth: ethIcon,
  fantom: ftmIcon,
  gnosis: gnosisIcon,
  harmony: harmonyIcon,
  heco: hecoIcon,
  iotex: iotexIcon,
  klaytn: klaytnIcon,
  kusama: kusamaIcon,
  moonbeam: moonbeamIcon,
  multichain: multichainIcon,
  near: nearIcon,
  nervos: nervosIcon,
  nervos_gw: nervosIcon,
  optimism: optimisimIcon,
  polkadot: polkadotIcon,
  polygon: ksmIcon,
  scrt: secretIcon,
  solana: solIcon,
  syscoin: syscoinIcon,
  tron: tronIcon,
  xdai: stakeIcon,
};

export function getChainIcon(name: string) {
  return chainIcons[name as keyof typeof chainIcons] || defaultIcon;
}
