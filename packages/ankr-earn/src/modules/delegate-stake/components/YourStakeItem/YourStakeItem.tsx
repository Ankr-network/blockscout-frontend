import BigNumber from 'bignumber.js';

import { t } from 'common';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { Token } from 'modules/common/types/token';
import { BaseTokenUsdAmount } from 'modules/delegate-stake/components/BaseTokenUsdAmount';
import { NavLink } from 'uiKit/NavLink';

import { useYourStakeItemStyles } from './useYourStakeItemStyles';

interface IYourStakeItemProps {
  amount: BigNumber;
  usdAmount: BigNumber;
  stakeLink?: string;
  unstakeLink?: string;
  token: Token;
  withTextUnstake?: boolean;
}

export const YourStakeItem = ({
  amount,
  usdAmount,
  stakeLink,
  unstakeLink,
  token,
  withTextUnstake = false,
}: IYourStakeItemProps): JSX.Element => {
  const classes = useYourStakeItemStyles();

  return (
    <div className={classes.root}>
      <BaseTokenUsdAmount
        amount={amount}
        buttonSlot={
          <div className={classes.btnWrapper}>
            {stakeLink && (
              <PlusMinusBtn
                className={classes.plusWalletButton}
                href={stakeLink}
                icon="plus"
                variant="outlined"
              />
            )}

            {unstakeLink &&
              (withTextUnstake ? (
                <NavLink
                  className={classes.btn}
                  href={unstakeLink}
                  variant="outlined"
                >
                  {t('stake-ankr.staking-table.unstake')}
                </NavLink>
              ) : (
                <PlusMinusBtn
                  className={classes.plusWalletButton}
                  href={unstakeLink}
                  icon="minus"
                  variant="outlined"
                />
              ))}
          </div>
        }
        token={token}
        usdAmount={usdAmount}
      />
    </div>
  );
};
