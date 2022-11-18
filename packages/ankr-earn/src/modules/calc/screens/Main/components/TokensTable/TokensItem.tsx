import { t } from '@ankr.com/common';
import {
  Box,
  ButtonBase,
  Hidden,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { ChangeEvent, ReactText, useCallback } from 'react';

import { useIsMDUp } from 'ui';

import {
  DAYS_IN_YEAR,
  DEFAULT_ROUNDING,
  ZERO,
  ZERO_DECIMAL_PLACES,
} from 'modules/common/const';
import { Days } from 'modules/common/types';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';

import { TokenWithIcon } from '../TokenWithIcon';

import { useTokensTableStyles } from './useTokensTableStyles';

const LOW_USD_VALUE = 10;
const MAX_DECIMALS_LENGTH = 18;
const FRACTIONAL_NUMBERS = new RegExp(
  `^(\\d*\\.{0,1}\\d{0,${MAX_DECIMALS_LENGTH}}$)`,
);

export interface ITokensItemProps {
  value?: ReactText;
  staked: BigNumber;
  apy: BigNumber;
  usdTokenPrice: BigNumber;
  iconSlot: JSX.Element;
  token: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCloseClick?: () => void;
  days: Days;
}

export const TokensItem = ({
  value,
  staked,
  apy,
  usdTokenPrice,
  iconSlot,
  token,
  onChange,
  onCloseClick,
  days,
}: ITokensItemProps): JSX.Element => {
  const classes = useTokensTableStyles();
  const isMDUp = useIsMDUp();

  const amount = value ? new BigNumber(value) : ZERO;
  const yieldAmount = amount.plus(staked).dividedBy(100).multipliedBy(apy);
  const yieldAmountUsd = yieldAmount.multipliedBy(usdTokenPrice);
  const decimalPlacesUsd = yieldAmountUsd.isLessThan(LOW_USD_VALUE)
    ? DEFAULT_ROUNDING
    : ZERO_DECIMAL_PLACES;
  const apyValue = apy.decimalPlaces(DEFAULT_ROUNDING).toFormat();

  const formattedYieldAmountUsd = yieldAmountUsd
    .dividedBy(DAYS_IN_YEAR)
    .multipliedBy(days)
    .decimalPlaces(decimalPlacesUsd)
    .toFormat();

  const formattedYieldAmount = yieldAmount
    .dividedBy(DAYS_IN_YEAR)
    .multipliedBy(days)
    .round()
    .toFormat();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const isValidated = event.target.value.match(FRACTIONAL_NUMBERS);
      if (isValidated) {
        onChange(event);
      }
    },
    [onChange],
  );

  return (
    <Paper className={classes.item} variant={isMDUp ? 'outlined' : 'elevation'}>
      <div className={classes.row}>
        <div className={classes.col}>
          <TokenWithIcon apy={apyValue} iconSlot={iconSlot} token={token} />
        </div>

        <div className={classNames(classes.col, classes.colSMHidden)}>
          <Typography className={classNames(classes.text, classes.apyColValue)}>
            {t('calc.table.apy-value', { value: apyValue })}
          </Typography>
        </div>

        <div className={classes.col}>
          <Hidden mdUp>
            <Box className={classes.label} mb={1.5}>
              {t('calc.table.amount')}
            </Box>
          </Hidden>

          <TextField
            fullWidth
            autoComplete="off"
            classes={{
              root: classes.textField,
            }}
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            name={`${token}-amount`}
            value={value}
            onChange={handleChange}
          />
        </div>

        <div className={classNames(classes.col, classes.colXsBordered)}>
          <div className={classes.label}>{t('calc.table.yield')}</div>

          <Box minWidth={0}>
            <Typography className={classes.text} title={formattedYieldAmount}>
              {formattedYieldAmount}
            </Typography>

            <Typography
              className={classNames(classes.text, classes.textSecondary)}
              color="textSecondary"
              title={formattedYieldAmountUsd}
            >
              {t('unit.usd-value', {
                value: formattedYieldAmountUsd,
              })}
            </Typography>
          </Box>
        </div>
      </div>

      {onCloseClick && (
        <ButtonBase className={classes.close} onClick={onCloseClick}>
          <CloseIcon htmlColor="inherit" size="inherit" />
        </ButtonBase>
      )}
    </Paper>
  );
};
