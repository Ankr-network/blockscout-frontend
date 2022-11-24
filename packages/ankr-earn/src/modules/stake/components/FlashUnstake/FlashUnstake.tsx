import { t } from '@ankr.com/common';
import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { useCallback } from 'react';

import { Radio } from 'ui';

import { DECIMAL_PLACES } from 'modules/common/const';

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

  const onFlashUnstakeClick = useCallback(() => {
    onChange(true);
  }, [onChange]);

  const onUnstakeClick = useCallback(() => {
    onChange(false);
  }, [onChange]);

  return (
    <div className={classes.root}>
      <Box className={classes.unstakeTypeBtn} onClick={onFlashUnstakeClick}>
        <div className={classes.unstakeTopRow}>
          <Radio disableRipple checked={value} color="primary" />

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
            {t('stake-bnb.unstake.standard-unstake-dur')}
          </div>

          <div className={classes.unstakeTag}>
            {t('stake-bnb.unstake.no-comission')}
          </div>
        </div>
      </Box>
    </div>
  );
};
