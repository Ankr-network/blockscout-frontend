import { Timeframe } from 'modules/common/components/RequestsChart';
import { text } from '../../utils/text';
import { BlueDot } from '../BlueDot';
import { useHeaderStyles } from './HeaderStyles';
import { html } from '../../utils/html';

export interface HeaderProps {
  allTimeRequests?: number;
  requests?: number;
  timeframe: Timeframe;
}

const timeframesMap: Record<Timeframe, string> = {
  [Timeframe.Day]: 'day',
  [Timeframe.Hour]: 'hour',
  [Timeframe.Week]: 'week',
  [Timeframe.Month]: 'month',
};

export const Header = ({
  allTimeRequests,
  requests,
  timeframe,
}: HeaderProps) => {
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>{text('title')}</div>
      <div className={classes.requests}>
        <div className={classes.detailedRequests}>
          <BlueDot />
          {html('requests', {
            timeframe: text(`timeframes.${timeframesMap[timeframe]}`),
            requests,
          })}
        </div>
        <div className={classes.detailedRequests}>
          {html('all-requests', { requests: allTimeRequests })}
        </div>
      </div>
    </div>
  );
};
