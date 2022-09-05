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

import { t } from 'common';
import { useIsMDUp } from 'ui';

import { DEFAULT_FIXED, DEFAULT_ROUNDING } from 'modules/common/const';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';

import { TokenWithIcon } from '../TokenWithIcon';

import { useTokensTableStyles } from './useTokensTableStyles';

const LOW_USD_VALUE = 10;
const ZERO_DECIMAL_PLACES = 0;

export interface ITokensItemProps {
  value: number;
  staked: BigNumber;
  apy: number;
  usdTokenPrice: number;
  onChange: () => null;
  iconSlot: JSX.Element;
  token: string;
}

export const TokensItem = ({
  value,
  staked,
  apy,
  usdTokenPrice,
  onChange,
  iconSlot,
  token,
}: ITokensItemProps): JSX.Element => {
  const classes = useTokensTableStyles();
  const isMDUp = useIsMDUp();

  const amount = new BigNumber(value);

  const yieldAmount = amount.dividedBy(100).multipliedBy(apy);
  const yieldAmountUsd = yieldAmount.multipliedBy(usdTokenPrice);
  const decimalPlacesUsd = yieldAmountUsd.isLessThan(LOW_USD_VALUE)
    ? DEFAULT_ROUNDING
    : ZERO_DECIMAL_PLACES;

  return (
    <Paper className={classes.item} variant={isMDUp ? 'outlined' : 'elevation'}>
      <div className={classes.row}>
        <div className={classes.col}>
          <TokenWithIcon apy={apy} iconSlot={iconSlot} token={token} />
        </div>

        <div className={classes.col}>
          <Hidden mdUp>
            <Box className={classes.label} mb={1.5}>
              {t('calc.table.amount')}
            </Box>
          </Hidden>

          <TextField
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
            onChange={onChange}
          />
        </div>

        <div className={classNames(classes.col, classes.colXsBordered)}>
          <div className={classes.label}>{t('calc.table.staked')}</div>

          <Typography className={classes.text}>
            {staked.decimalPlaces(DEFAULT_FIXED).toFormat()}
          </Typography>
        </div>

        <div className={classNames(classes.col, classes.colXsBordered)}>
          <div className={classes.label}>{t('calc.table.yield')}</div>

          <div>
            <Typography className={classes.text}>
              {yieldAmount.decimalPlaces(DEFAULT_FIXED).toFormat()}
            </Typography>

            <Typography
              className={classNames(classes.text, classes.textSecondary)}
              color="textSecondary"
            >
              {t('unit.usd-value', {
                value: yieldAmountUsd
                  .decimalPlaces(decimalPlacesUsd)
                  .toFormat(),
              })}
            </Typography>
          </div>
        </div>
      </div>

      <ButtonBase className={classes.close}>
        <CloseIcon htmlColor="inherit" size="inherit" />
      </ButtonBase>
    </Paper>
  );
};
