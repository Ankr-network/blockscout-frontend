import { Paper } from '@mui/material';

import { ScrollableContainer } from 'modules/common/components/ScrollableContainer';
import { UsageHistoryData } from 'domains/dashboard/store/types';

import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { Table } from './components/Table';
import { Title } from '../Title';
import { getText } from './utils/text';
import { useUsageHistoryWidgetStyles } from './UsageHistoryWidgetStyles';

export interface UsageHistoryWidgetProps {
  className: string;
  data: UsageHistoryData[];
}

export const UsageHistoryWidget = ({
  className,
  data,
}: UsageHistoryWidgetProps) => {
  const { classes, cx } = useUsageHistoryWidgetStyles();
  const {
    classes: { container },
  } = useNoDataContainerStyles(data.length === 0);

  return (
    <Paper className={cx(classes.root, container, className)}>
      <Title>{getText('title')}</Title>
      <NoDataGuard data={data}>
        <ScrollableContainer>
          <Table data={data} />
        </ScrollableContainer>
      </NoDataGuard>
    </Paper>
  );
};
