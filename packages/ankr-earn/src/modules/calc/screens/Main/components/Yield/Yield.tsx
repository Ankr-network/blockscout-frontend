import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import { ReactText, useState } from 'react';

import { t } from 'common';
import { useIsMDUp } from 'ui';

import { Days } from 'modules/common/types';
import { BigNumberish } from 'modules/common/utils/numbers/converters';
import { RoutesConfig } from 'modules/stake/Routes';
import { NavLink } from 'uiKit/NavLink';

import { YieldSlider } from '../YieldSlider';

import { useYieldStyles } from './useYieldStyles';

const DEFAULT_VALUE = 100;
const DAYS_IN_YEAR: Days = 365;
const DECIMAL_PLACES = 0;
const STAKE_PATH = RoutesConfig.main.generatePath();

interface IYieldProps {
  apy?: ReactText;
  isLoading?: boolean;
  totalUsd?: BigNumberish;
}

export const Yield = ({
  apy = 0,
  isLoading = false,
  totalUsd = 0,
}: IYieldProps): JSX.Element => {
  const classes = useYieldStyles();
  const isMDUp = useIsMDUp();
  const [value, setValue] = useState(DEFAULT_VALUE);

  const handleChange = (_event: unknown, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const dailyYield = new BigNumber(totalUsd).dividedBy(DAYS_IN_YEAR);
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
        <Box mb={5}>
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
                  t('unit.percentage-value', { value: apy })
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <YieldSlider
          className={classes.slider}
          defaultValue={DEFAULT_VALUE}
          disabled={isLoading}
          max={DAYS_IN_YEAR}
          onChange={handleChange}
        />

        <Grid container alignItems="center" spacing={3}>
          <Grid item xs>
            <Typography className={classes.label}>
              {t('calc.yield.profit')}
            </Typography>
          </Grid>

          <Grid item xs="auto">
            <Typography className={classes.value} component="h4" variant="h3">
              {isLoading ? (
                <Skeleton width={120} />
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
