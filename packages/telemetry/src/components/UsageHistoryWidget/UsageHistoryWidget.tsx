import { Paper } from '@mui/material';

import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { ScrollableContainer } from '../ScrollableContainer';
import { Table } from './components/Table';
import { Title } from '../Title';
import { useUsageHistoryWidgetStyles } from './UsageHistoryWidgetStyles';
import { UsageHistoryDataType } from '../../types';

export interface UsageHistoryWidgetProps {
  className: string;
  title: string;
  headingTitles: string[];
  data: UsageHistoryDataType[];
}

export const UsageHistoryWidget = ({
  headingTitles,
  className,
  title,
  data,
}: UsageHistoryWidgetProps) => {
  const { classes, cx } = useUsageHistoryWidgetStyles();
  const {
    classes: { container },
  } = useNoDataContainerStyles(data.length === 0);

  return (
    <Paper className={cx(classes.root, container, className)}>
      <Title>{title}</Title>
      <NoDataGuard data={data}>
        <ScrollableContainer>
          <Table data={data} headingTitles={headingTitles} />
        </ScrollableContainer>
      </NoDataGuard>
    </Paper>
  );
};
