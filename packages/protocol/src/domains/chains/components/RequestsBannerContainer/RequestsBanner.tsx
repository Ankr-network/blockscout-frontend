import { Timeframe } from 'domains/chains/types';
import { IRequestsBannerResponse } from 'domains/chains/utils/requestsBannerUtils';
import { useFailedRequestsBannerStyles as useRequestsBannerStyles } from '../FailedRequestsBanner/useFailedRequestsBannerStyles';
import { Notice } from './components/Notice';
import { Header } from './components/Header';
import { RequestsChartWrapper } from './components/RequestsChartWrapper';
import { valuesMap } from '../TimeframeSwitcher/const';

interface IRequestsBannerProps {
  timeframe: Timeframe;
  data: IRequestsBannerResponse;
  total?: string;
}

export const RequestsBanner = ({
  timeframe,
  data,
  total,
}: IRequestsBannerProps) => {
  const { classes } = useRequestsBannerStyles();

  const { list } = data;

  return (
    <div className={classes.root}>
      <Header timeframeValue={valuesMap[timeframe]} total={total} />
      <div className={classes.container}>
        <div className={classes.chart}>
          <RequestsChartWrapper data={list} />
        </div>
        <Notice />
      </div>
    </div>
  );
};
