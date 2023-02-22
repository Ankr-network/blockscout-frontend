import { Timeframe } from 'domains/chains/types';
import { IFailedRequestsBannerResponse } from 'domains/chains/utils/failedRequestsBannerUtils';
import { valuesMap } from '../TimeframeSwitcher/const';
import { FailedRequestsChart } from './Components/FailedRequestsChart';
import { Header } from './Components/Header';
import { Notice } from './Components/Notice';
import { useFailedRequestsBannerStyles } from './useFailedRequestsBannerStyles';

interface IFailedRequestsBannerProps {
  timeframe: Timeframe;
  data: IFailedRequestsBannerResponse;
}

export const FailedRequestsBanner = ({
  timeframe,
  data,
}: IFailedRequestsBannerProps) => {
  const { classes } = useFailedRequestsBannerStyles();

  const { total, rate, rejectedRequestsCount, list } = data;

  return (
    <div className={classes.root}>
      <Header
        switchValue={valuesMap[timeframe]}
        total={total}
        rate={rate}
        rejectedRequestsCount={rejectedRequestsCount}
      />
      <div className={classes.container}>
        <div className={classes.chart}>
          <FailedRequestsChart data={list} />
        </div>
        <Notice />
      </div>
    </div>
  );
};
