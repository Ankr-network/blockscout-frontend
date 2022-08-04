import { Card, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import cn from 'classnames';
import * as d3 from 'd3';
import { useCallback } from 'react';

import { t } from 'common';

import { Milliseconds } from 'modules/common/types';

import { usePortfolioChart, TSelectSvg } from './usePortfolioChart';
import { usePortfolioChartStyles } from './usePortfolioChartStyles';

export interface IPortfolioChartProps {
  data: IChartSlice[];
  isLoading: boolean;
  height: number;
  width: number;
}

export interface IChartSlice {
  name: string;
  percent: number;
}

const TRANSITION_DURATION_MS: Milliseconds = 200;

export const PortfolioChart = ({
  data,
  isLoading,
  height,
  width,
}: IPortfolioChartProps): JSX.Element => {
  const classes = usePortfolioChartStyles();

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

      const color = d3.scaleOrdinal(data, d3.schemeCategory10);

      const generalInfoHeight = 22;
      const offset = (generalInfoHeight * color.domain().length) / 2;

      const pie = d3.pie<void, IChartSlice>().value(({ percent }) => percent);

      const path = d3
        .arc<d3.PieArcDatum<IChartSlice>>()
        .outerRadius(radius / 1.15)
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
        .attr('transform', () => {
          const vertical = generalInfoHeight - offset;

          return `translate(0, ${vertical})`;
        })
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
        .text(t('dashboard.apr', { value: 7.1 }));
    },
    [data, classes, width, height],
  );

  const { ref } = usePortfolioChart(renderChart, [width, height, data]);

  return (
    <div>
      <Typography className={classes.title} component="h1" variant="h3">
        {t('dashboard.portfolio')}
      </Typography>

      <Card className={classes.root}>
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
      </Card>
    </div>
  );
};
