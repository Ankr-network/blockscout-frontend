import { Paper, SxProps } from '@mui/material';

import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { ScrollableContainer } from '../ScrollableContainer';
import { Table } from './components/Table';
import { Title } from '../Title';
import { useUsageHistoryWidgetStyles } from './UsageHistoryWidgetStyles';
import { UsageHistoryData } from '../../types';
import { Theme } from '@mui/material/styles';

export interface UsageHistoryWidgetProps {
  className: string;
  title: string;
  headingTitles: string[];
  data: UsageHistoryData[];
  sx?: SxProps<Theme>;
}

export const UsageHistoryWidget = ({
  headingTitles,
  className,
  title,
  data,
  sx,
}: UsageHistoryWidgetProps) => {
  const { classes, cx } = useUsageHistoryWidgetStyles();
  const {
    classes: { container },
  } = useNoDataContainerStyles();

  return (
    <Paper
      sx={sx}
      className={cx(classes.root, className, {
        [container]: data.length === 0,
      })}
    >
      <Title>{title}</Title>
      <NoDataGuard data={data}>
        <ScrollableContainer>
          <Table data={data} headingTitles={headingTitles} />
        </ScrollableContainer>
      </NoDataGuard>
    </Paper>
  );
};
