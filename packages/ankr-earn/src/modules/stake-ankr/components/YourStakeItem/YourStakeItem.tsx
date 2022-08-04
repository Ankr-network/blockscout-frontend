import BigNumber from 'bignumber.js';

import { t } from 'common';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { NavLink } from 'uiKit/NavLink';

import { BaseAnkrAmount } from '../BaseAnkrAmount';

import { useYourStakeItemStyles } from './useYourStakeItemStyles';

interface IYourStakeItemProps {
  ankrAmount: BigNumber;
  usdAmount: BigNumber;
  stakeLink?: string;
  unstakeLink?: string;
  withTextUnstake?: boolean;
}

export const YourStakeItem = ({
  ankrAmount,
  usdAmount,
  stakeLink,
  unstakeLink,
  withTextUnstake = false,
}: IYourStakeItemProps): JSX.Element => {
  const classes = useYourStakeItemStyles();

  return (
    <div className={classes.root}>
      <BaseAnkrAmount
        ankrAmount={ankrAmount}
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
        usdAmount={usdAmount}
      />
    </div>
  );
};
