import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMemo } from 'react';
import { uid } from 'react-uid';

import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'modules/common/components/TableComponents';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { BaseAmount } from 'modules/referrals/components/BaseAmount';

import { useClaimHistory } from '../../hooks/useClaimHistory';

import { useClaimHistoryTableStyles } from './useClaimHistoryTableStyles';

const SKELETON_ROWS_COUNT = 1;
const SKELETON_COLUMN_WIDTHS = [200, 200];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

enum ELabel {
  date,
  amount,
}

export const ClaimHistoryTable = (): JSX.Element | null => {
  const classes = useClaimHistoryTableStyles();

  const { data, isLoading } = useClaimHistory();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('referrals.claim-history.date'),
      },
      {
        label: t('referrals.claim-history.amount'),
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
              {j === columnWidths.length - 1 ? (
                <div className={classes.amountSkeleton}>
                  <Skeleton width={width} />
                </div>
              ) : (
                <Skeleton width={width} />
              )}
            </TableBodyCell>
          ))}
        </TableRow>
      )),
    [captions, classes],
  );

  if (!data?.length && !isLoading) {
    return null;
  }

  return (
    <Table columnsCount={captions.length} customCell="1fr 1fr" minWidth={300}>
      <TableHead>
        {captions.map(({ label }, i) => (
          <TableHeadCell
            key={uid(i)}
            align={i === captions.length - 1 ? 'right' : undefined}
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
                  {t('referrals.claim-history.date-value', {
                    value: row.date,
                    hours: row.date.getHours(),
                    minutes: row.date.getMinutes(),
                  })}
                </Typography>
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.amount].label}`}>
                <div className={classes.amount}>
                  <BaseAmount
                    amount={row.amount}
                    token={row.token}
                    usdAmount={row.amountUsd}
                  />
                </div>
              </TableBodyCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
