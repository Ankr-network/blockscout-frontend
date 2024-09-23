import { useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { PrivateStatTopRequests } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { NoData } from '../NoData';
import { useMethodCallsTableStyles } from './useMethodCallsTableStyles';

interface IMethodCallsTableProps {
  data: PrivateStatTopRequests[];
  isCostHidden?: boolean;
}

const MAX_PERCENTS = 100;

const getUsagePercent = (maxCountTotal: number, count: number) => {
  return maxCountTotal ? (+count * MAX_PERCENTS) / maxCountTotal : 0;
};

export const MethodCallsTable = ({
  data,
  isCostHidden,
}: IMethodCallsTableProps) => {
  const { classes, cx } = useMethodCallsTableStyles();

  const maxCountTotal = useMemo(() => {
    if (!data.length) return 0;

    return Math.max(...data.map(usageDetail => +usageDetail.count));
  }, [data]);

  if (!data.length) {
    return (
      <div className={classes.noData}>
        <NoData />
      </div>
    );
  }

  return (
    <div className={classes.content}>
      <Table className={classes.table} size="small" aria-label="actions table">
        <TableHead>
          <TableRow>
            <TableCell className={cx(classes.cell, classes.th)}>
              <b>{t('chain-item.method-calls.table.method')}</b>
            </TableCell>
            <TableCell className={cx(classes.cell, classes.th)}>
              <b>{t('chain-item.method-calls.table.count')}</b>
            </TableCell>
            {!isCostHidden && (
              <TableCell className={cx(classes.cell, classes.th)}>
                <b>{t('chain-item.method-calls.table.total-cost')}</b>
              </TableCell>
            )}
            <TableCell className={cx(classes.cell, classes.th)}>
              <b>{t('chain-item.method-calls.table.percentage')}</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ count, method, total_cost }) => {
            return (
              <TableRow key={method}>
                <TableCell className={classes.cell}>{method}</TableCell>
                <TableCell className={classes.cell}>{count}</TableCell>
                {!isCostHidden && (
                  <TableCell className={classes.cell}>
                    {total_cost || 0}
                  </TableCell>
                )}
                <TableCell className={classes.cell}>
                  <Box
                    className={classes.progressbar}
                    style={{
                      width: `${getUsagePercent(maxCountTotal, +count)}%`,
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
