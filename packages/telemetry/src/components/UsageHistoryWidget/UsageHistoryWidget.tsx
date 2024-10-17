import { Paper, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { ScrollableContainer } from '../ScrollableContainer';
import { Table } from './components/Table';
import { Title } from '../Title';
import { useUsageHistoryWidgetStyles } from './UsageHistoryWidgetStyles';
import { UsageHistoryDataMapped } from '../../types';

export interface UsageHistoryWidgetProps {
  NoDataPlaceholder?: typeof NoDataGuard;
  className: string;
  data: UsageHistoryDataMapped[];
  headingTitles: string[];
  sx?: SxProps<Theme>;
  title: string;
}

export const UsageHistoryWidget = ({
  NoDataPlaceholder = NoDataGuard,
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
      <NoDataPlaceholder data={data}>
        <ScrollableContainer>
          <Table data={data} headingTitles={headingTitles} />
        </ScrollableContainer>
      </NoDataPlaceholder>
    </Paper>
  );
};
