import { Timeframe } from 'domains/chains/types';
import { IRequestsBannerResponse } from 'domains/chains/utils/requestsBannerUtils';
import { valuesMap } from '../TimeframeSwitcher/const';
import { FailedRequestsChart } from './Components/FailedRequestsChart';
import { Header } from './Components/Header';
import { Notice } from './Components/Notice';
import { useFailedRequestsBannerStyles } from './useFailedRequestsBannerStyles';

interface IFailedRequestsBannerProps {
  timeframe: Timeframe;
  data: IRequestsBannerResponse;
}

export const FailedRequestsBanner = ({
  timeframe,
  data,
}: IFailedRequestsBannerProps) => {
  const { classes } = useFailedRequestsBannerStyles();

  const { rate, total, rejectedRequestsCount, list } = data;

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
