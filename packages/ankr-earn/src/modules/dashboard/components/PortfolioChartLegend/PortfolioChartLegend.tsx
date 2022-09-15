import { Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { MouseEvent as ReactMouseEvent } from 'react';

import { t, tHTML } from 'common';

import { TIcon } from 'modules/common/icons';
import { Token } from 'modules/common/types/token';
import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

import { usePortfolioChartLegendStyles } from './usePortfolioChartLegendStyles';

export interface IPortfolioChartLegendProps {
  apr: BigNumber;
  totalAmount: BigNumber;
  yearlYield: BigNumber;
  totalPercent: BigNumber;
  legendItems: ILegendItem[];
  isLoading: boolean;
  isNative?: boolean;
  activeLegendItem?: ILegendItem | null;
  onMouseOver: (item: ILegendItem) => void;
  onMouseLeave: (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface ILegendItem {
  name: Token;
  color: string;
  percent: number;
  amount: BigNumber;
  usdAmount: BigNumber;
  yieldAmount: BigNumber;
  yieldAmountUsd: BigNumber;
  apy: BigNumber;
  icon: TIcon;
  isNative: boolean;
  link?: string;
}

export const PortfolioChartLegend = ({
  apr,
  isNative = false,
  isLoading,
  totalAmount,
  yearlYield,
  totalPercent,
  legendItems,
  activeLegendItem,
  onMouseOver,
  onMouseLeave,
}: IPortfolioChartLegendProps): JSX.Element => {
  const classes = usePortfolioChartLegendStyles();

  if (isLoading) {
    return (
      <div data-testid="loading-state">
        <Typography className={classes.title}>
          <Skeleton width="100%" />
        </Typography>

        <Typography className={classes.amount}>
          <Skeleton width="100%" />
        </Typography>

        <div className={classes.wrapper}>
          <Skeleton width={50} />

          <Skeleton width={150} />
        </div>

        <Grid container className={classes.items}>
          <Grid item xs={12}>
            <Skeleton height={61} width="100%" />
          </Grid>

          <Grid item xs={12}>
            <Skeleton height={61} width="100%" />
          </Grid>

          <Grid item xs={12}>
            <Skeleton height={61} width="100%" />
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div className={classes.legends}>
      <Typography className={classes.title}>
        {t(`dashboard.${!isNative ? 'stakedAssets' : 'availableAssets'}`, {
          percent: totalPercent.toFormat(),
        })}
      </Typography>

      <Typography className={classes.amount}>
        {t('dashboard.portfolioUSD', {
          value: totalAmount.toFormat(),
        })}
      </Typography>

      <Tooltip
        title={
          isNative
            ? t('dashboard.potentialAprTooltip')
            : t('dashboard.aprTooltip')
        }
      >
        <div className={classes.wrapper}>
          <Typography className={classes.apr}>
            {tHTML('dashboard.apy', { value: apr.toFormat() })}
          </Typography>

          <Typography className={classes.yield}>
            {tHTML(
              `dashboard.${!isNative ? 'yearlyYieldUsd' : 'potentialYieldUsd'}`,
              { value: yearlYield.toFormat() },
            )}
          </Typography>
        </div>
      </Tooltip>

      <Grid container className={classes.items}>
        {legendItems.map(item => (
          <Grid
            key={item.name}
            item
            data-testid={`legend-${item.name}`}
            xs={12}
            onMouseLeave={onMouseLeave}
            onMouseOver={() => onMouseOver(item)}
          >
            <div
              className={classNames(
                activeLegendItem &&
                  activeLegendItem.name === item.name &&
                  activeLegendItem.isNative === item.isNative &&
                  classes.legendItemHover,
                classes.legendItem,
              )}
            >
              {!isNative && (
                <div
                  className={classes.color}
                  style={{ backgroundColor: item.color }}
                />
              )}

              <item.icon className={classes.icon} />

              <div>
                <Typography className={classes.legendItemTitle}>
                  {tHTML('dashboard.portfolioToken', {
                    token: item.name,
                    amount: item.amount.toFormat(),
                  })}
                </Typography>

                <Typography className={classes.legendItemSubtitle}>
                  {t('dashboard.portfolioUSD', {
                    value: item.usdAmount.toFormat(),
                  })}

                  <small>{item.percent}%</small>
                </Typography>
              </div>

              {isNative && item.link && (
                <NavLink
                  className={classes.stake}
                  href={item.link}
                  variant="contained"
                >
                  {t('dashboard.stake')}
                </NavLink>
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
