import { Card, Typography, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import * as d3 from 'd3';
import { useCallback, useMemo, useState } from 'react';

import { t } from 'common';

import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { TIcon } from 'modules/common/icons';
import { Milliseconds } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

import { PortfolioChartLegend, ILegendItem } from '../PortfolioChartLegend';

import { usePortfolioChart, TSelectSvg } from './usePortfolioChart';
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
  icon: TIcon;
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

  const nativeTokens = useMemo(
    () =>
      data
        .filter(({ isNative }) => isNative)
        .map(item => ({ ...item, color: COLORS[COLORS.length - 1] })),
    [data],
  );

  const syntheticTokens = useMemo(
    () =>
      data
        .filter(({ isNative }) => !isNative)
        .map((item, index) => ({ ...item, color: COLORS[index] })),
    [data],
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
        .attr('height', svgWidth)
        .attr('width', svgWidth)
        .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`);

      const pie = d3
        .pie<void, ILegendItem>()
        .value(({ percent }) => percent)
        .sort(null);

      const path = d3
        .arc<d3.PieArcDatum<ILegendItem>>()
        .outerRadius(d => {
          return d.data.name !== activeItem?.name
            ? radius / 1.15
            : radius / 1.2;
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
        .attr('fill', d => d.data.color);

      const generalInfo = g
        .append('g')
        .attr('transform', 'translate(0, -30)')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('x', '50%')
        .attr('y', '50%');

      generalInfo
        .append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('class', classes.chartText)
        .text(t('dashboard.totalAssets'));

      generalInfo
        .append('text')
        .attr('x', 0)
        .attr('y', 40)
        .attr('class', classes.total)
        .text(
          t('dashboard.portfolioUSD', {
            value: totalAmountUsd.toFormat(),
          }),
        );

      generalInfo
        .append('text')
        .attr('x', 0)
        .attr('y', 80)
        .attr('class', classes.apr)
        .text(t('dashboard.apr', { value: totalApr }).replace(/<\/?b>/g, ''));
    },
    [
      chartData,
      totalApr,
      activeItem?.name,
      classes,
      totalAmountUsd,
      width,
      height,
    ],
  );

  const { ref } = usePortfolioChart(renderChart, [width, height, chartData]);

  if (!isLoading && data.length === 0) {
    return null;
  }

  return (
    <div>
      <Typography className={classes.title} component="h1" variant="h3">
        {t('dashboard.portfolio')}
      </Typography>

      <Card className={classes.root}>
        <Grid container spacing={2}>
          <Grid
            item
            className={classes.chartWrapper}
            lg={12}
            md={12}
            xl={5}
            xs={12}
          >
            {isLoading ? (
              <Skeleton
                data-testid="portfolio-chart-loading-state"
                height={height}
                variant="circle"
                width={width}
              />
            ) : (
              <svg
                ref={ref}
                data-testid="portfolio-chart"
                height={height}
                width={width}
              />
            )}
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
      </Card>
    </div>
  );
};
