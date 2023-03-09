import { t } from '@ankr.com/common';
import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { useCallback } from 'react';

import { Radio } from 'ui';

import { DECIMAL_PLACES } from 'modules/common/const';
import { UNSTAKE_DAY_INTERVALS_BY_TOKEN } from 'modules/stake/const';
import { Quote } from 'uiKit/Quote';

import { ReactComponent as InstantIcon } from './assets/instant.svg';
import { useFlashUnstakeStyles } from './useFlashUnstakeStyles';

interface FlashUnstakeProps {
  value: boolean;
  poolBalance: BigNumber;
  instantFee: BigNumber;
  onChange: (value: boolean) => void;
}

export const FlashUnstake = ({
  value,
  onChange,
  poolBalance,
  instantFee,
}: FlashUnstakeProps): JSX.Element => {
  const classes = useFlashUnstakeStyles();

  const isZeroPoolBalance = poolBalance.isZero();

  const onFlashUnstakeClick = useCallback(() => {
    if (!isZeroPoolBalance) {
      onChange(true);
    }
  }, [onChange, isZeroPoolBalance]);

  const onUnstakeClick = useCallback(() => {
    onChange(false);
  }, [onChange]);

  return (
    <div
      className={classNames(
        classes.root,
        isZeroPoolBalance && classes.rootZeroBalance,
      )}
    >
      <Box
        className={classNames(
          classes.unstakeTypeBtn,
          isZeroPoolBalance && classes.unstakeTypeBtnDisabled,
        )}
        onClick={onFlashUnstakeClick}
      >
        <div className={classes.unstakeTopRow}>
          <Radio
            disableRipple
            checked={value}
            color="primary"
            disabled={isZeroPoolBalance}
          />

          <span
            className={classNames(
              classes.unstakeTitle,
              value && classes.unstakeTitleActive,
            )}
          >
            {t('stake-bnb.unstake.flash-unstake')}
          </span>
        </div>

        <div className={classes.unstakeTagList}>
          <div className={classes.unstakeTag}>
            <InstantIcon className={classes.instantIcon} />

            {t('stake-bnb.unstake.instantly')}
          </div>

          <div className={classes.unstakeTag}>
            {t('stake-bnb.unstake.comission', {
              value: instantFee.toString(),
            })}
          </div>

          <div className={classes.unstakeTag}>
            {t('stake-bnb.unstake.pool-capacity', {
              value: poolBalance
                .decimalPlaces(DECIMAL_PLACES, BigNumber.ROUND_DOWN)
                .toFormat(),
            })}
          </div>
        </div>

        {isZeroPoolBalance && (
          <div className={classes.quoteCont}>
            <Quote>{t('stake-bnb.unstake.empty-pool')}</Quote>
          </div>
        )}
      </Box>

      <Box className={classes.unstakeTypeBtn} onClick={onUnstakeClick}>
        <div className={classes.unstakeTopRow}>
          <Radio checked={!value} color="primary" />

          <span
            className={classNames(
              classes.unstakeTitle,
              !value && classes.unstakeTitleActive,
            )}
          >
            {t('stake-bnb.unstake.standard-unstake')}
          </span>
        </div>

        <div className={classes.unstakeTagList}>
          <div className={classes.unstakeTag}>
            {t('stake-bnb.unstake.standard-unstake-dur', {
              period: UNSTAKE_DAY_INTERVALS_BY_TOKEN.BNB,
            })}
          </div>

          <div className={classes.unstakeTag}>
            {t('stake-bnb.unstake.no-comission')}
          </div>
        </div>
      </Box>
    </div>
  );
};
