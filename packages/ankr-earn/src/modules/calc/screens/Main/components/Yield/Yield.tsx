import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { useThrottledCallback } from 'use-debounce';

import { t } from 'common';
import { useIsMDUp } from 'ui';

import { DEFAULT_YIELD_DAYS_VALUE } from 'modules/calc/const';
import { DAYS_IN_YEAR, DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { RoutesConfig } from 'modules/stake/Routes';
import { NavLink } from 'uiKit/NavLink';

import { YieldSlider } from '../YieldSlider';

import { YIELD_DAYS_UPDATE_THROTTLE_SPEED } from './const';
import { useYieldStyles } from './useYieldStyles';

const DECIMAL_PLACES = 0;
const STAKE_PATH = RoutesConfig.main.generatePath();

interface IYieldProps {
  apy?: BigNumber;
  isLoading?: boolean;
  totalUsd?: BigNumber;
  onChange: (days: Days) => void;
}

export const Yield = ({
  apy = ZERO,
  isLoading = false,
  totalUsd = ZERO,
  onChange,
}: IYieldProps): JSX.Element => {
  const classes = useYieldStyles();
  const isMDUp = useIsMDUp();
  const [value, setValue] = useState(DEFAULT_YIELD_DAYS_VALUE);
  const onValueChange = useThrottledCallback(
    setValue,
    YIELD_DAYS_UPDATE_THROTTLE_SPEED,
  );

  const handleChange = (_event: unknown, newValue: number | number[]) => {
    onValueChange(newValue as number);
    onChange(newValue as number);
  };

  const dailyYield = totalUsd.dividedBy(DAYS_IN_YEAR);
  const totalValue = dailyYield
    .multipliedBy(value)
    .decimalPlaces(DECIMAL_PLACES)
    .toFormat();

  const renderedButton = (
    <Box mt={4}>
      <NavLink fullWidth href={STAKE_PATH} size="large" variant="contained">
        {t('calc.yield.btn')}
      </NavLink>
    </Box>
  );

  return (
    <>
      <Paper
        className={classes.root}
        variant={isMDUp ? 'outlined' : 'elevation'}
      >
        <Box mb={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <Typography className={classes.label}>
                {t('calc.yield.period')}
              </Typography>
            </Grid>

            <Grid item xs="auto">
              <Typography className={classes.apy} color="textSecondary">
                {`${t('calc.yield.apy')} `}

                {isLoading ? (
                  <Box component="span" display="inline-block" lineHeight={1.1}>
                    <Skeleton width={30} />
                  </Box>
                ) : (
                  t('unit.percentage-value', {
                    value: apy.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
                  })
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <YieldSlider
          className={classes.slider}
          defaultValue={DEFAULT_YIELD_DAYS_VALUE}
          disabled={isLoading}
          max={DAYS_IN_YEAR}
          onChange={handleChange}
        />

        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={5}>
            <Typography className={classes.label}>
              {t('calc.yield.profit')}
            </Typography>
          </Grid>

          <Grid item xs={7}>
            <Typography className={classes.value} variant="h4">
              {isLoading ? (
                <Box component="span" display="inline-block">
                  <Skeleton width={120} />
                </Box>
              ) : (
                t('unit.usd-value', { value: totalValue })
              )}
            </Typography>
          </Grid>
        </Grid>

        {!isMDUp && renderedButton}
      </Paper>

      {isMDUp && renderedButton}
    </>
  );
};
