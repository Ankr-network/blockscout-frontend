import avaxIcon from './avax.svg';
import ethIcon from './eth.svg';
import ftmIcon from './ftm.svg';
import ksmIcon from './ksm.svg';
import solIcon from './sol.svg';
import stakeIcon from './stake.svg';
import { Token } from '@ankr.com/multirpc';

const chainIcons: { [key in Token]: string } = {
  [Token.avax]: avaxIcon,
  [Token.eth]: ethIcon,
  [Token.ftm]: ftmIcon,
  [Token.ksm]: ksmIcon,
  [Token.sol]: solIcon,
  [Token.stake]: stakeIcon,
};

export function getTokenIcon(name: Token) {
  return chainIcons[name];
}
