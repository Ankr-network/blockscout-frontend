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
import { Token } from 'modules/common/types/token';
import { BaseTokenUsdAmount } from 'modules/delegate-stake/components/BaseTokenUsdAmount';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { ActionCell } from 'modules/stake-ankr/components/ActionCell';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

import { RoutesConfig } from '../../../../RoutesConfig';
import { useUnstakingData } from '../../hooks/useUnstakingData';

import { useUnstakingTableStyles } from './useUnstakingTableStyles';

const SKELETON_ROWS_COUNT = 1;
const SKELETON_COLUMN_WIDTHS = [200, 200, 200];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

enum ELabel {
  provider,
  amount,
  action,
}

export const UnstakingTable = (): JSX.Element | null => {
  const classes = useUnstakingTableStyles();

  const { data, isLoading } = useUnstakingData();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('stake-ankr.staking-table.node-provider'),
      },
      {
        label: t('stake-ankr.staking-table.unstake-amount'),
      },
      {
        label: ' ',
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
    <>
      <Table
        columnsCount={captions.length}
        customCell="1fr 1fr 1fr"
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
            data?.map((row, i) => {
              const claimLink =
                row.daysLeft <= 0
                  ? RoutesConfig.claimUnstakes.generatePath(row.provider)
                  : '';
              return (
                <TableRow key={uid(i)}>
                  <TableBodyCell label={`${captions[ELabel.provider].label}`}>
                    <Typography className={classes.providerName}>
                      {getDemoProviderName(row.provider) ?? row.provider}
                    </Typography>
                  </TableBodyCell>

                  <TableBodyCell label={`${captions[ELabel.amount].label}`}>
                    <BaseTokenUsdAmount
                      amount={row.unstakeAmount}
                      token={Token.ANKR}
                      usdAmount={row.usdUnstakeAmount}
                    />
                  </TableBodyCell>

                  <TableBodyCell
                    align="right"
                    label={`${captions[ELabel.action].label}`}
                  >
                    <ActionCell claimLink={claimLink} daysLeft={row.daysLeft} />
                  </TableBodyCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};