import { Skeleton } from '@material-ui/lab';
import { uid } from 'react-uid';

import {
  Table as BasicTable,
  TableBody,
  TableBodyCell,
  TableRow,
} from 'modules/common/components/TableComponents';
import { ActionCell } from 'modules/stake-ankr/components/ActionCell';
import { BaseAnkrAmount } from 'modules/stake-ankr/components/BaseAnkrAmount';

import { useUnstakeData } from '../../hooks/useUnstakeData';

import { useStakeInfoStyles } from './useStakeInfoStyles';

const SKELETON_ROWS_COUNT = 1;
const SKELETON_COLUMN_WIDTHS = [200, 200, 200];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

export const UnstakeTable = (): JSX.Element | null => {
  const classes = useStakeInfoStyles();

  const { data, isLoading } = useUnstakeData();

  const renderedSkeletonRows = SKELETON_ROWS.map((columnWidths, i) => (
    <TableRow key={uid(i)}>
      {columnWidths.map((width, j) => (
        <TableBodyCell key={uid(`${i}-${j}`)}>
          <Skeleton width={width} />
        </TableBodyCell>
      ))}
    </TableRow>
  ));

  if (!data?.length && !isLoading) {
    return null;
  }

  return (
    <BasicTable
      dense
      className={classes.table}
      columnsCount={2}
      customCell="1fr 1fr"
      minWidth={300}
    >
      <TableBody>
        {isLoading && renderedSkeletonRows}

        {!isLoading &&
          data?.map((row, i) => (
            <TableRow key={uid(i)}>
              <TableBodyCell className={classes.cell}>
                <BaseAnkrAmount
                  ankrAmount={row.unstakeAmount}
                  usdAmount={row.usdUnstakeAmount}
                />
              </TableBodyCell>

              <TableBodyCell align="right" className={classes.cell}>
                <ActionCell claimLink={row.claimLink} daysLeft={row.daysLeft} />
              </TableBodyCell>
            </TableRow>
          ))}
      </TableBody>
    </BasicTable>
  );
};
