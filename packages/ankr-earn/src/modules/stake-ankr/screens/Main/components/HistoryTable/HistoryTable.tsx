import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMemo } from 'react';
import { uid } from 'react-uid';

import { t } from 'common';

import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'modules/common/components/TableComponents';
import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { NavLink } from 'uiKit/NavLink';

import { useHistoryData } from '../../hooks/useHistoryData';

import { useHistoryTableStyles } from './useHistoryTableStyles';

const SKELETON_ROWS_COUNT = 3;
const SKELETON_COLUMN_WIDTHS = [200, 200, 200, 200];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

enum ELabel {
  date,
  hash,
  event,
  amount,
}

export const HistoryTable = (): JSX.Element | null => {
  const classes = useHistoryTableStyles();

  const { data, isLoading } = useHistoryData();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('stake-ankr.staking-table.date'),
      },
      {
        label: t('stake-ankr.staking-table.hash'),
      },
      {
        label: t('stake-ankr.staking-table.event'),
      },
      {
        label: t('stake-ankr.staking-table.amount'),
      },
    ],
    [],
  );

  const renderedSkeletonRows = useMemo(
    () =>
      SKELETON_ROWS.map((columnWidths, i) => (
        <TableRow key={uid(i)}>
          {columnWidths.map((width, j) => (
            <TableBodyCell key={uid(`${i}-${j}`)} label={captions[j].label}>
              <Skeleton width={width} />
            </TableBodyCell>
          ))}
        </TableRow>
      )),
    [captions],
  );

  if (!data?.length && !isLoading) {
    return null;
  }

  return (
    <Table
      columnsCount={captions.length}
      customCell="1fr 1fr 1fr 1fr"
      minWidth={800}
    >
      <TableHead>
        {captions.map(({ label }, i) => (
          <TableHeadCell
            key={uid(i)}
            classes={{
              content: classes.thContent,
            }}
            label={<>{label}</>}
          />
        ))}
      </TableHead>

      <TableBody>
        {isLoading && renderedSkeletonRows}

        {!isLoading &&
          data?.map((row, i) => (
            <TableRow key={uid(i)}>
              <TableBodyCell label={`${captions[ELabel.date].label}`}>
                <Typography className={classes.simpleText}>
                  {t('format.long-date', { value: row.date })}
                </Typography>
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.hash].label}`}>
                <Typography className={classes.simpleText}>
                  <NavLink className={classes.txLink} href={row.link}>
                    {getShortTxHash(row.hash, 8)}
                  </NavLink>
                </Typography>
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.event].label}`}>
                <Typography className={classes.simpleText}>
                  {row.event}
                </Typography>
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.amount].label}`}>
                <Typography className={classes.simpleText}>
                  {t('unit.ankr-value', { value: row.amount.toFormat() })}
                </Typography>
              </TableBodyCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
