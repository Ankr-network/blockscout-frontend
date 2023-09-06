import { Paper, Typography } from '@mui/material';

import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { ScrollableContainer } from '../ScrollableContainer';
import { Title } from '../Title';
import { useTableWidgetStyles } from '../../utils/TableWidgetStyles';
import { BaseTableData } from '../../types';
import { HeadingTitles } from './components/HeadingTitles';
import { DataTable } from './components/DataTable';

interface BaseTableProps {
  className?: string;
  title: string;
  headingTitles: string[] | JSX.Element[];
  data: BaseTableData[];
}

export interface ViewProps {
  style: React.CSSProperties;
}

export const BaseTable = ({
  className,
  data,
  title,
  headingTitles,
}: BaseTableProps) => {
  const { cx, classes } = useTableWidgetStyles();

  const {
    classes: { container },
  } = useNoDataContainerStyles(data.length === 0);

  return (
    <Paper className={cx(classes.root, container, className)}>
      <Title className={classes.title}>{title}</Title>
      <NoDataGuard data={data}>
        <ScrollableContainer>
          <HeadingTitles
            headingTitles={headingTitles}
            hidden={data.length > 0}
          />
          <DataTable data={data} />
        </ScrollableContainer>
      </NoDataGuard>
    </Paper>
  );
};
