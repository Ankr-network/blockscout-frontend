import avaxIcon from './avax.svg';
import ethIcon from './eth.svg';
import ftmIcon from './ftm.svg';
import ksmIcon from './ksm.svg';
import solIcon from './sol.svg';
import stakeIcon from './stake.svg';
import arbitrumIcon from './arbitrum.svg';
import defaultIcon from './default-icon.svg';
import celoIcon from './celo.svg';
import nearIcon from './near.svg';

const chainIcons = {
  avalanche: avaxIcon,
  eth: ethIcon,
  fantom: ftmIcon,
  polygon: ksmIcon,
  solana: solIcon,
  xdai: stakeIcon,
  arbitrum: arbitrumIcon,
  celo: celoIcon,
  near: nearIcon,
};

export function getChainIcon(name: string) {
  return chainIcons[name as keyof typeof chainIcons] || defaultIcon;
}
