import BigNumber from 'bignumber.js';

import { t } from 'common';

import { Token } from 'modules/common/types/token';
import { BaseTokenUsdAmount } from 'modules/delegate-stake/components/BaseTokenUsdAmount';
import { NavLink } from 'uiKit/NavLink';

import { useRewardsItemStyles } from './useRewardsItemStyles';

interface IRewardsItemProps {
  ankrAmount: BigNumber;
  usdAmount: BigNumber;
  restakeLink?: string;
  claimLink?: string;
}

export const RewardsItem = ({
  ankrAmount,
  usdAmount,
  restakeLink,
  claimLink,
}: IRewardsItemProps): JSX.Element => {
  const classes = useRewardsItemStyles();

  return (
    <div className={classes.root}>
      <BaseTokenUsdAmount
        amount={ankrAmount}
        buttonSlot={
          <div className={classes.btnWrapper}>
            {restakeLink && (
              <NavLink
                className={classes.btn}
                href={restakeLink}
                variant="outlined"
              >
                {t('stake-ankr.staking-table.restake')}
              </NavLink>
            )}

            {claimLink && (
              <NavLink
                className={classes.btn}
                href={claimLink}
                variant="outlined"
              >
                {t('stake-ankr.staking-table.claim')}
              </NavLink>
            )}
          </div>
        }
        token={Token.ANKR}
        usdAmount={usdAmount}
      />
    </div>
  );
};
