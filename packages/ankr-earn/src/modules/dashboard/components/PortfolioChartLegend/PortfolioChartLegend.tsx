import { Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { t, tHTML } from 'common';

import { TIcon } from 'modules/common/icons';
import { Token } from 'modules/common/types/token';
import { Button } from 'uiKit/Button';

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
  onMouseLeave: (item: ILegendItem) => void;
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

      <div className={classes.wrapper}>
        <Typography className={classes.apr}>
          {tHTML('dashboard.apr', { value: apr.toFormat() })}
        </Typography>

        <Typography className={classes.yield}>
          {tHTML(
            `dashboard.${!isNative ? 'yearlyYieldUsd' : 'potentialYieldUsd'}`,
            { value: yearlYield.toFormat() },
          )}
        </Typography>
      </div>

      <Grid container className={classes.items}>
        {legendItems.map(item => (
          <Grid
            key={item.name}
            item
            data-testid={`legend-${item.name}`}
            xs={12}
            onMouseLeave={() => onMouseLeave(item)}
            onMouseOver={() => onMouseOver(item)}
          >
            <div
              className={classNames(
                activeLegendItem?.name === item.name && classes.legendItemHover,
                classes.legendItem,
              )}
            >
              <div
                className={classes.color}
                style={{ backgroundColor: item.color }}
              />

              <item.icon className={classes.icon} />

              <div>
                <Typography className={classes.legendItemTitle}>
                  {tHTML('dashboard.portfolioToken', {
                    token: item.name,
                    amount: item.amount.toFormat(),
                    percent: item.percent,
                  })}
                </Typography>

                <Typography className={classes.legendItemSubtitle}>
                  {t('dashboard.portfolioUSD', {
                    value: item.usdAmount.toFormat(),
                  })}
                </Typography>
              </div>

              {isNative && item.link && (
                <Button className={classes.stake} href={item.link}>
                  {t('dashboard.stake')}
                </Button>
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
