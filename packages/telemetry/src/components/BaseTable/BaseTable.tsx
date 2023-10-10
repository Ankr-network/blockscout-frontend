import { Paper, SxProps } from '@mui/material';

import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { ScrollableContainer } from '../ScrollableContainer';
import { Title } from '../Title';
import { useTableWidgetStyles } from '../../utils/TableWidgetStyles';
import { BaseTableData } from '../../types';
import { HeadingTitles } from './components/HeadingTitles';
import { DataTable } from './components/DataTable';
import { Theme } from '@mui/material/styles';

interface BaseTableProps {
  className?: string;
  title: string;
  headingTitles: string[] | JSX.Element[];
  data: BaseTableData[];
  sx?: SxProps<Theme>;
}

export interface ViewProps {
  style: React.CSSProperties;
}

export const BaseTable = ({
  className,
  data,
  title,
  headingTitles,
  sx,
}: BaseTableProps) => {
  const { cx, classes } = useTableWidgetStyles();

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
