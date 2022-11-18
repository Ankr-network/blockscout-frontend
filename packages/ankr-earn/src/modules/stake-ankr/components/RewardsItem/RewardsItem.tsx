import BigNumber from 'bignumber.js';

import { t } from 'common';

import { Token } from 'modules/common/types/token';
import { BaseTokenUsdAmount } from 'modules/delegate-stake/components/BaseTokenUsdAmount';
import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

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
              <Tooltip arrow title={t('common.tooltips.comingSoon')}>
                <span>
                  <NavLink
                    disabled
                    className={classes.btn}
                    href={restakeLink}
                    variant="outlined"
                  >
                    {t('stake-ankr.staking-table.restake')}
                  </NavLink>
                </span>
              </Tooltip>
            )}

            {claimLink && (
              <Tooltip arrow title={t('common.tooltips.comingSoon')}>
                <span>
                  <NavLink
                    disabled
                    className={classes.btn}
                    href={claimLink}
                    variant="outlined"
                  >
                    {t('stake-ankr.staking-table.claim')}
                  </NavLink>
                </span>
              </Tooltip>
            )}
          </div>
        }
        token={Token.ANKR}
        usdAmount={usdAmount}
      />
    </div>
  );
};
