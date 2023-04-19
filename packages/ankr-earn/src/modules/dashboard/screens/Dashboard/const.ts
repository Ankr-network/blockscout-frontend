import { Token } from 'modules/common/types/token';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';

import { IUseStakedPolkadotCardProps } from './hooks/liquid-tokens/Polkadot/useStakedPolkadotCard';
import { IUseClaimedPolkadotCardProps } from './hooks/liquid-tokens/Polkadot/useUnclaimedPolkadotCard';

/**
 * Tokens that have a small price.
 * For these tokens, we reduce the number of decimals to 0
 */
export const SMALL_PRICE_TOKENS = [
  Token.ANKR,
  Token.FTM,
  Token.MATIC,
  Token.aFTMb,
  Token.aFTMc,
  Token.aMATICb,
  Token.aMATICc,
];

export const DOT_PROPS: IUseClaimedPolkadotCardProps &
  IUseStakedPolkadotCardProps = {
  ethToken: Token.aDOTb,
  network: EPolkadotNetworks.DOT,
  polkadotToken: Token.DOT,
};

export const KSM_PROPS: IUseClaimedPolkadotCardProps &
  IUseStakedPolkadotCardProps = {
  ethToken: Token.aKSMb,
  network: EPolkadotNetworks.KSM,
  polkadotToken: Token.KSM,
};

export const WND_PROPS: IUseClaimedPolkadotCardProps &
  IUseStakedPolkadotCardProps = {
  ethToken: Token.aWNDb,
  network: EPolkadotNetworks.WND,
  polkadotToken: Token.WND,
};

/**
 * Number of weeks to show in the history
 */
export const HISTORY_STEP_WEEKS = 2;