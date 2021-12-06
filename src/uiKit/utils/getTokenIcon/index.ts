import avaxIcon from './avax.svg';
import ethIcon from './eth.svg';
import ftmIcon from './ftm.svg';
import ksmIcon from './ksm.svg';
import solIcon from './sol.svg';
import stakeIcon from './stake.svg';
import arbitrumIcon from './arbitrum.svg';
import defaultIcon from './default-icon.svg';
import celoIcon from './celo.svg';
import { Chain } from '@ankr.com/multirpc';

const chainIcons: { [key in Chain]: string } = {
  [Chain.avalanche]: avaxIcon,
  [Chain.eth]: ethIcon,
  [Chain.fantom]: ftmIcon,
  [Chain.polygon]: ksmIcon,
  [Chain.solana]: solIcon,
  [Chain.xdai]: stakeIcon,
  [Chain.arbitrum]: arbitrumIcon,
  [Chain.celo]: celoIcon,
};

export function getChainIcon(name: Chain) {
  return chainIcons[name] || defaultIcon;
}
