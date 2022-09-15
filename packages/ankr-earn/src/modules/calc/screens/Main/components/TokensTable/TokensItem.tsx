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

import { t } from 'common';
import { useIsMDUp } from 'ui';

import {
  DEFAULT_ROUNDING,
  ZERO,
  ZERO_DECIMAL_PLACES,
} from 'modules/common/const';
import { getDecimalPlaces } from 'modules/common/utils/numbers/getDecimalPlaces';
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
}: ITokensItemProps): JSX.Element => {
  const classes = useTokensTableStyles();
  const isMDUp = useIsMDUp();

  const amount = value ? new BigNumber(value) : ZERO;
  const yieldAmount = amount.plus(staked).dividedBy(100).multipliedBy(apy);
  const yieldAmountUsd = yieldAmount.multipliedBy(usdTokenPrice);
  const decimalPlacesUsd = yieldAmountUsd.isLessThan(LOW_USD_VALUE)
    ? DEFAULT_ROUNDING
    : ZERO_DECIMAL_PLACES;

  const formattedYieldAmountUsd = yieldAmountUsd
    .decimalPlaces(decimalPlacesUsd)
    .toFormat();

  const formattedYieldAmount = yieldAmount
    .decimalPlaces(getDecimalPlaces(yieldAmount))
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
          <TokenWithIcon
            apy={apy.decimalPlaces(DEFAULT_ROUNDING).toFormat()}
            iconSlot={iconSlot}
            token={token}
          />
        </div>

        <div className={classes.col}>
          <Hidden mdUp>
            <Box className={classes.label} mb={1.5}>
              {t('calc.table.amount')}
            </Box>
          </Hidden>

          <TextField
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
          <div className={classes.label}>{t('calc.table.staked')}</div>

          <Typography className={classes.text}>
            {staked.decimalPlaces(getDecimalPlaces(staked)).toFormat()}
          </Typography>
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
