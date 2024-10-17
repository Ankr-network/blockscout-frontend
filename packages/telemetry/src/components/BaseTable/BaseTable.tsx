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
  NoDataPlaceholder?: typeof NoDataGuard;
  className?: string;
  data: BaseTableData[];
  headingTitles: string[] | JSX.Element[];
  sx?: SxProps<Theme>;
  title: string;
}

export interface ViewProps {
  style: React.CSSProperties;
}

export const BaseTable = ({
  NoDataPlaceholder = NoDataGuard,
  className,
  data,
  headingTitles,
  sx,
  title,
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
      <NoDataPlaceholder data={data}>
        <ScrollableContainer>
          <HeadingTitles
            headingTitles={headingTitles}
            hidden={data.length > 0}
          />
          <DataTable data={data} />
        </ScrollableContainer>
      </NoDataPlaceholder>
    </Paper>
  );
};
