import { IpDetails } from 'multirpc-sdk';
import { Paper, Typography } from '@mui/material';

import { ScrollableContainer } from 'modules/common/components/ScrollableContainer';

import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { Title } from '../Title';
import { text } from './utils/text';
import { useTableWidgetStyles } from '../TableWidget/TableWidgetStyles';

interface RequestsByIpProps {
  className?: string;
  data: IpDetails[];
}

export interface ViewProps {
  style: React.CSSProperties;
}

export const RequestsByIpWidget = ({ className, data }: RequestsByIpProps) => {
  const { cx, classes } = useTableWidgetStyles();

  const {
    classes: { container },
  } = useNoDataContainerStyles(data.length === 0);

  return (
    <Paper className={cx(classes.root, container, className)}>
      <Title className={classes.title}>{text('title')}</Title>
      <NoDataGuard data={data}>
        <ScrollableContainer>
          <div
            className={cx(classes.row, classes.rowHeader, {
              [classes.isHidden]: data.length > 0,
            })}
          >
            <Typography variant="caption">{text('ip')}</Typography>
            <Typography variant="caption">{text('requests')}</Typography>
          </div>
          {data.map(({ ip, count }) => (
            <div key={ip} className={classes.row}>
              <Typography className={classes.longText} variant="caption">
                {ip}
              </Typography>
              <Typography variant="caption">
                {text('count', { count })}
              </Typography>
            </div>
          ))}
        </ScrollableContainer>
      </NoDataGuard>
    </Paper>
  );
};
