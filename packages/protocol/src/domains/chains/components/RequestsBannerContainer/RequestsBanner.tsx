import { Timeframe } from 'domains/chains/types';
import { IRequestsBannerResponse } from 'domains/chains/utils/requestsBannerUtils';
import { useFailedRequestsBannerStyles as useRequestsBannerStyles } from '../FailedRequestsBanner/useFailedRequestsBannerStyles';
import { Tab } from 'modules/common/hooks/useTabs';
import { Notice } from './components/Notice';
import { Header } from './components/Header';
import { RequestsChartWrapper } from './components/RequestsChartWrapper';

interface IRequestsBannerProps {
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
  data: IRequestsBannerResponse;
}

export const RequestsBanner = ({
  timeframe,
  timeframeTabs,
  data,
}: IRequestsBannerProps) => {
  const { classes } = useRequestsBannerStyles();

  const { successRequestsCount, list } = data;

  return (
    <div className={classes.root}>
      <Header
        timeframe={timeframe}
        timeframeTabs={timeframeTabs}
        total={successRequestsCount}
      />
      <div className={classes.container}>
        <div className={classes.chart}>
          <RequestsChartWrapper data={list} />
        </div>
        <Notice />
      </div>
    </div>
  );
};
