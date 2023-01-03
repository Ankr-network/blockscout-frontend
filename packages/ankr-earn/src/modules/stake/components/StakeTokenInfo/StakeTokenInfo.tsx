import { tHTML } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import avax3DIcon from './assets/avax.png';
import bnb3DIcon from './assets/bnb.png';
import eth3DIcon from './assets/eth.png';
import ftm3DIcon from './assets/ftm.png';
import matic3DIcon from './assets/matic.png';
import { useStakeTokenInfoStyles } from './useStakeTokenInfoStyles';

interface StakeTokenInfoProps {
  token: string;
  nativeToken: Token;
  nativeAmount?: BigNumber;
}

const ICONS: Partial<Record<Token, string>> = {
  [Token.ETH]: eth3DIcon,
  [Token.MATIC]: matic3DIcon,
  [Token.BNB]: bnb3DIcon,
  [Token.FTM]: ftm3DIcon,
  [Token.AVAX]: avax3DIcon,
};

export const StakeTokenInfo = ({
  token,
  nativeToken,
  nativeAmount = ZERO,
}: StakeTokenInfoProps): JSX.Element => {
  const classes = useStakeTokenInfoStyles();

  return (
    <div className={classes.root}>
      <img alt={token} className={classes.icon} src={ICONS[nativeToken]} />

      <div className={classes.description}>
        {tHTML('stake.token-info', {
          token,
          nativeToken,
          nativeAmount: nativeAmount.round().toFormat(),
        })}
      </div>
    </div>
  );
};
