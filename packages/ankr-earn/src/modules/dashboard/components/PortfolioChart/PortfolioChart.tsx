import { Box, Card, Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import * as d3 from 'd3';
import { useCallback, useMemo, useState } from 'react';

import { t, tHTML } from 'common';

import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { TIcon } from 'modules/common/icons';
import { Milliseconds } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { Tooltip } from 'uiKit/Tooltip';

import { ILegendItem, PortfolioChartLegend } from '../PortfolioChartLegend';
import { ProtfolioHeader, ProtfolioHeaderMobile } from '../ProtfolioHeader';

import { TSelectSvg, usePortfolioChart } from './usePortfolioChart';
import { usePortfolioChartStyles } from './usePortfolioChartStyles';

export interface IPortfolioChartProps {
  data: IChartSlice[];
  totalNativeAmountUsd: BigNumber;
  totalStakedAmountUsd: BigNumber;
  stakedApr: BigNumber;
  totalStakedYieldAmountUsd: BigNumber;
  totalNativeYieldAmountUsd: BigNumber;
  nativeApr: BigNumber;
  isLoading: boolean;
  height: number;
  width: number;
}

export interface IChartSlice {
  name: Token;
  percent: number;
  amount: BigNumber;
  usdAmount: BigNumber;
  isNative: boolean;
  yieldAmount: BigNumber;
  yieldAmountUsd: BigNumber;
  apy: BigNumber;
  icon: TIcon;
  link?: string;
}

const TRANSITION_DURATION_MS: Milliseconds = 200;

const COLORS = [
  '#356DF3',
  '#46E8FE',
  '#5AE07F',
  '#21C2A9',
  '#FEE046',
  '#FFAA6C',
  '#F33535',
  '#D134EA',
  '#7942E3',
  '#2C17A9',
  '#1D1647',
  '#BFC6D0',
];

const NATIVE_HOVER_COLOR = '#9AA1B0';

const TOKENS_WITH_APR = [Token.ANKR, Token.mGNO];

export const PortfolioChart = ({
  data,
  totalNativeAmountUsd,
  totalStakedAmountUsd,
  stakedApr,
  totalStakedYieldAmountUsd,
  totalNativeYieldAmountUsd,
  nativeApr,
  isLoading,
  height,
  width,
}: IPortfolioChartProps): JSX.Element | null => {
  const classes = usePortfolioChartStyles({ width });
  const [activeItem, setActiveItem] = useState<ILegendItem | null>(null);

  const totalAmountUsd = totalNativeAmountUsd.plus(totalStakedAmountUsd);

  const items = useMemo(
    () => data.slice().sort((a, b) => b.percent - a.percent),
    [data],
  );

  const nativeTokens = useMemo(
    () =>
      items
        .filter(({ isNative }) => isNative)
        .map(item => ({ ...item, color: COLORS[COLORS.length - 1] })),
    [items],
  );

  const syntheticTokens = useMemo(
    () =>
      items
        .filter(({ isNative }) => !isNative)
        .map((item, index) => ({ ...item, color: COLORS[index] })),
    [items],
  );

  const chartData = useMemo(
    () => nativeTokens.concat(syntheticTokens),
    [syntheticTokens, nativeTokens],
  );

  const totalApr = useMemo(
    () =>
      !totalAmountUsd.isZero()
        ? totalStakedYieldAmountUsd
            .plus(totalStakedAmountUsd)
            .plus(totalNativeAmountUsd)
            .multipliedBy(100)
            .dividedBy(totalAmountUsd)
            .minus(100)
            .decimalPlaces(DEFAULT_ROUNDING)
        : ZERO,
    [
      totalStakedAmountUsd,
      totalStakedYieldAmountUsd,
      totalNativeAmountUsd,
      totalAmountUsd,
    ],
  );

  const handleMouseLeave = useCallback(() => {
    setActiveItem(null);
  }, [setActiveItem]);

  const handleMouseOver = useCallback(
    (item: ILegendItem) => {
      setActiveItem(item);
    },
    [setActiveItem],
  );

  const renderChart = useCallback(
    (svg: TSelectSvg) => {
      const svgWidth = width;
      const svgHeight = height;
      const radius = Math.min(svgWidth, svgHeight) / 2;

      svg.selectAll('g').remove();

      const g = svg
        .append('g')
        .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
        .attr('height', svgHeight)
        .attr('width', svgWidth)
        .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`);

      const pie = d3
        .pie<void, ILegendItem>()
        .value(({ percent }) => percent)
        .sort((a, b) => (a.isNative || b.isNative ? -1 : 1));

      const path = d3
        .arc<d3.PieArcDatum<ILegendItem>>()
        .outerRadius(d => {
          return activeItem &&
            d.data.name === activeItem.name &&
            d.data.isNative === activeItem.isNative
            ? radius / 1.2
            : radius / 1.1;
        })
        .innerRadius(radius);

      const arc = g
        .selectAll('.arc')
        .data(pie(chartData))
        .enter()
        .append('g')
        .attr('class', 'arc')
        .attr('opacity', 1)
        .attr('data-testid', d => d.data.name)
        .on('mouseover', function mouseover(_, d) {
          setActiveItem(d.data);
          d3.select(this)
            .transition()
            .duration(TRANSITION_DURATION_MS)
            .attr('opacity', 0.85);
        })
        .on('mouseout', function mouseout() {
          setActiveItem(null);
          d3.select(this)
            .transition()
            .duration(TRANSITION_DURATION_MS)
            .attr('opacity', 1);
        });

      arc
        .append('path')
        .attr('d', path)
        .attr('fill', d =>
          activeItem && d.data.name === activeItem.name && activeItem.isNative
            ? NATIVE_HOVER_COLOR
            : d.data.color,
        );
    },
    [chartData, activeItem, width, height],
  );

  const { ref } = usePortfolioChart(renderChart, [width, height, chartData]);

  const yieldTitle = activeItem?.link
    ? t('dashboard.potentialYield')
    : t('dashboard.yearlyYield');

  const amountTitle = activeItem
    ? activeItem.yieldAmount.toFormat()
    : t('dashboard.portfolioUSD', {
        value: totalAmountUsd.toFormat(),
      });

  const aprTitle = tHTML('dashboard.apr', { value: totalApr });

  const dollarTitle = activeItem
    ? t('dashboard.portfolioUSD', {
        value: activeItem.yieldAmountUsd.toFormat(),
      })
    : '';

  const aprKey =
    activeItem && TOKENS_WITH_APR.includes(activeItem.name) ? 'apr' : 'apy';

  const apyTitle = activeItem
    ? t(`dashboard.${aprKey}`, { value: activeItem.apy.toFormat() }).replace(
        /<\/?b>/g,
        '',
      )
    : '';

  if (!isLoading && data.length === 0) {
    return null;
  }

  return (
    <Box mb={7}>
      <ProtfolioHeader />

      <Card className={classes.root}>
        <ProtfolioHeaderMobile />

        {isLoading ? (
          <Box
            data-testid="portfolio-chart-loading-state"
            height={200}
            position="relative"
          >
            <QueryLoadingAbsolute />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid
              item
              className={classes.chartWrapper}
              lg={12}
              md={12}
              xl={6}
              xs={12}
            >
              <div className={classes.chartContainer}>
                <svg
                  ref={ref}
                  data-testid="portfolio-chart"
                  height={height}
                  width={width}
                />

                <div className={classes.info}>
                  <Typography className={classes.chartText}>
                    {activeItem ? yieldTitle : t('dashboard.totalAssets')}
                  </Typography>

                  <div className={classes.amountWrapper}>
                    {activeItem && <activeItem.icon className={classes.icon} />}

                    <Typography className={classes.total}>
                      {amountTitle}
                    </Typography>
                  </div>

                  {activeItem ? (
                    <div className={classes.hoverInfo}>
                      <div className={classes.hoverInfoBlock}>
                        <Typography className={classes.apr}>
                          {dollarTitle}
                        </Typography>

                        <Typography className={classes.apr}>
                          {apyTitle}
                        </Typography>
                      </div>
                    </div>
                  ) : (
                    <Tooltip
                      title={t('dashboard.averageAprTooltip', {
                        potentialYield: totalNativeYieldAmountUsd.toFormat(),
                      })}
                    >
                      <Typography className={classes.apr}>
                        {aprTitle}
                      </Typography>
                    </Tooltip>
                  )}
                </div>
              </div>
            </Grid>

            <Grid item lg={6} md={12} xl={3} xs={12}>
              <PortfolioChartLegend
                activeLegendItem={activeItem}
                apr={stakedApr}
                isLoading={isLoading}
                legendItems={syntheticTokens}
                totalAmount={totalStakedAmountUsd}
                totalPercent={
                  !totalAmountUsd.isZero()
                    ? totalStakedAmountUsd
                        .multipliedBy(100)
                        .dividedBy(totalAmountUsd)
                        .decimalPlaces(DEFAULT_ROUNDING)
                    : ZERO
                }
                yearlYield={totalStakedYieldAmountUsd}
                onMouseLeave={handleMouseLeave}
                onMouseOver={handleMouseOver}
              />
            </Grid>

            <Grid item lg={6} md={12} xl={3} xs={12}>
              <PortfolioChartLegend
                isNative
                activeLegendItem={activeItem}
                apr={nativeApr}
                isLoading={isLoading}
                legendItems={nativeTokens}
                totalAmount={totalNativeAmountUsd}
                totalPercent={
                  !totalAmountUsd.isZero()
                    ? totalNativeAmountUsd
                        .multipliedBy(100)
                        .dividedBy(totalAmountUsd)
                        .decimalPlaces(DEFAULT_ROUNDING)
                    : ZERO
                }
                yearlYield={totalNativeYieldAmountUsd}
                onMouseLeave={handleMouseLeave}
                onMouseOver={handleMouseOver}
              />
            </Grid>
          </Grid>
        )}
      </Card>
    </Box>
  );
};
