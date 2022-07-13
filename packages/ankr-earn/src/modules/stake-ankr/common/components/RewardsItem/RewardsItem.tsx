import BigNumber from 'bignumber.js';

import { t } from 'common';

import { NavLink } from 'uiKit/NavLink';

import { BaseAnkrAmount } from '../BaseAnkrAmount';

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
      <BaseAnkrAmount
        ankrAmount={ankrAmount}
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
        usdAmount={usdAmount}
      />
    </div>
  );
};
