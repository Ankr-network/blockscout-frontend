import { Card, Typography, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import * as d3 from 'd3';
import { useCallback, useMemo, useState } from 'react';

import { t } from 'common';

import { Milliseconds } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

import {
  PortfolioChartLegend,
  IPortfolioChartLegendProps,
} from '../PortfolioChartLegend';

import { usePortfolioChart, TSelectSvg } from './usePortfolioChart';
import { usePortfolioChartStyles } from './usePortfolioChartStyles';

export interface IPortfolioChartProps {
  data: IChartSlice[];
  isLoading: boolean;
  height: number;
  width: number;
}

export interface IChartSlice {
  name: Token;
  percent: number;
  amount: BigNumber;
  usdAmount: BigNumber;
  icon: JSX.Element;
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
  isLoading,
  height,
  width,
}: IPortfolioChartProps): JSX.Element => {
  const classes = usePortfolioChartStyles();
  const [activeItem, setActiveItem] = useState<
    IPortfolioChartLegendProps['legendItems'][0] | null
  >(null);

  const items = useMemo(
    () =>
      data.map((item, index) => ({
        ...item,
        color: COLORS[index],
      })),
    [data],
  );

  const nativeTokens = useMemo(
    () => items.filter(({ name }) => !name.match(/a*.(b|c)/)),
    [items],
  );

  const syntheticTokens = useMemo(
    () => items.filter(({ name }) => name.match(/a*.(b|c)/)),
    [items],
  );

  const handleMouseLeave = useCallback(() => {
    setActiveItem(null);
  }, [setActiveItem]);

  const handleMouseOver = useCallback(
    (item: IPortfolioChartLegendProps['legendItems'][0]) => {
      setActiveItem(item);
    },
    [setActiveItem],
  );

  const renderChart = useCallback(
    (svg: TSelectSvg) => {
      const svgWidth = width;
      const svgHeight = height;
      const radius = Math.min(svgWidth, svgHeight) / 2;

      d3.selectAll('g').remove();

      const g = svg
        .append('g')
        .attr('height', svgWidth)
        .attr('width', svgWidth)
        .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`);

      const color = d3.scaleOrdinal(data, COLORS);

      const pie = d3.pie<void, IChartSlice>().value(({ percent }) => percent);

      const path = d3
        .arc<d3.PieArcDatum<IChartSlice>>()
        .outerRadius(d =>
          d.data.name !== activeItem?.name ? radius / 1.15 : radius / 1.2,
        )
        .innerRadius(radius);

      const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', classes.tooltip);

      const arc = g
        .selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc')
        .attr('opacity', 1)
        .attr('data-testid', d => d.data.name)
        .on('mouseover', function mouseover(event: MouseEvent, d) {
          const percents = t('unit.percentage-value', {
            value: d.data.percent,
          });

          d3.select(this)
            .transition()
            .duration(TRANSITION_DURATION_MS)
            .attr('opacity', 0.85);

          tooltip
            .transition()
            .duration(TRANSITION_DURATION_MS)
            .text(`${d.data.name} (${percents})`)
            .attr('class', cn(classes.tooltip, classes.activeTooltip))
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 15}px`);
        })
        .on('mouseout', function mouseout() {
          d3.select(this)
            .transition()
            .duration(TRANSITION_DURATION_MS)
            .attr('opacity', 1);
          tooltip
            .transition()
            .duration(TRANSITION_DURATION_MS)
            .attr('class', classes.tooltip);
        });

      arc
        .append('path')
        .attr('d', path)
        .attr('fill', d => color(d.data));

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
        .text('$ 91,200');

      generalInfo
        .append('text')
        .attr('x', 0)
        .attr('y', 80)
        .attr('class', classes.apr)
        .text(t('dashboard.apr', { value: 7.1 }).replace(/<\/?b>/g, ''));
    },
    [data, activeItem?.name, classes, width, height],
  );

  const { ref } = usePortfolioChart(renderChart, [width, height, data]);

  return (
    <div>
      <Typography className={classes.title} component="h1" variant="h3">
        {t('dashboard.portfolio')}
      </Typography>

      <Card className={classes.root}>
        <Grid container spacing={2}>
          <Grid item className={classes.chartWrapper} lg={4} md={12} xs={12}>
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

          <Grid item lg={4} md={12} xs={12}>
            <PortfolioChartLegend
              apr={new BigNumber(7.1)}
              legendItems={syntheticTokens}
              totalAmount={new BigNumber(50_600)}
              totalPercent={new BigNumber(50)}
              yearlYield={new BigNumber(10_100)}
              onMouseLeave={handleMouseLeave}
              onMouseOver={handleMouseOver}
            />
          </Grid>

          <Grid item lg={4} md={12} xs={12}>
            <PortfolioChartLegend
              isSynthetic
              apr={new BigNumber(7.1)}
              legendItems={nativeTokens}
              totalAmount={new BigNumber(40_200)}
              totalPercent={new BigNumber(50)}
              yearlYield={new BigNumber(10_100)}
              onMouseLeave={handleMouseLeave}
              onMouseOver={handleMouseOver}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
