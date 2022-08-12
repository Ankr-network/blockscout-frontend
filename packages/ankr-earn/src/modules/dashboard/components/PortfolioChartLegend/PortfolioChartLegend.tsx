import { Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { cloneElement } from 'react';

import { t, tHTML } from 'common';

import { Token } from 'modules/common/types/token';

import { usePortfolioChartLegendStyles } from './usePortfolioChartLegendStyles';

export interface IPortfolioChartLegendProps {
  apr: BigNumber;
  totalAmount: BigNumber;
  yearlYield: BigNumber;
  totalPercent: BigNumber;
  legendItems: ILegendItem[];
  isSynthetic?: boolean;
  onMouseOver: (item: ILegendItem) => void;
  onMouseLeave: (item: ILegendItem) => void;
}

interface ILegendItem {
  name: Token;
  color: string;
  percent: number;
  amount: BigNumber;
  usdAmount: BigNumber;
  icon: JSX.Element;
}

// TODO: add skeleton loader
export const PortfolioChartLegend = ({
  apr,
  isSynthetic = false,
  totalAmount,
  yearlYield,
  totalPercent,
  legendItems,
  onMouseOver,
  onMouseLeave,
}: IPortfolioChartLegendProps): JSX.Element => {
  const classes = usePortfolioChartLegendStyles();

  return (
    <div>
      <Typography className={classes.title}>
        {t(`dashboard.${!isSynthetic ? 'stakedAssets' : 'availableAssets'}`, {
          percent: totalPercent.toFormat(),
        })}
      </Typography>

      <Typography className={classes.amount}>
        {t('dashboard.portfolioUSD', { value: totalAmount.toFormat() })}
      </Typography>

      <div className={classes.wrapper}>
        <Typography className={classes.apr}>
          {tHTML('dashboard.apr', { value: apr.toFormat() })}
        </Typography>

        <Typography className={classes.yield}>
          {tHTML(
            `dashboard.${!isSynthetic ? 'yearlyYield' : 'potentialYield'}`,
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
            <div className={classes.legendItem}>
              <div
                className={classes.color}
                style={{ backgroundColor: item.color }}
              />

              {cloneElement(item.icon, { className: classes.icon })}

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
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
