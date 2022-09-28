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
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { getNextUnlockTime } from 'modules/referrals/utils/getNextUnlockTime';
import { NavLink } from 'uiKit/NavLink';

import { useStatsData } from '../../hooks/useStatsData';

import { AmountWithIcon } from './components/AmountWithIcon';
import { BaseTokenUsdAmount } from './components/BaseTokenUsdAmount';
import { useStatsTableStyles } from './useStatsTableStyles';

const SKELETON_ROWS_COUNT = 1;
const SKELETON_COLUMN_WIDTHS = [200, 200, 200, 200];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

enum ELabel {
  totalStaked,
  pendingRewards,
  claimableRewards,
  nextUnlock,
}

export const StatsTable = (): JSX.Element | null => {
  const classes = useStatsTableStyles();
  const { data, isLoading, nextUnlock } = useStatsData();

  const nextUnlockText = t('referrals.stats-table.next-unlock');

  const captions = useLocaleMemo(
    () => [
      {
        label: t('referrals.stats-table.total-staked'),
      },
      {
        label: t('referrals.stats-table.pending-rewards'),
      },
      {
        label: t('referrals.stats-table.claimable-rewards'),
      },
      {
        label: nextUnlockText,
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
      dense
      columnsCount={captions.length}
      customCell="1.5fr 1fr 1fr 200px"
      minWidth={800}
    >
      <TableHead>
        {captions.map(({ label }, i) => (
          <TableHeadCell
            key={uid(i)}
            classes={{
              content: classes.thContent,
            }}
            label={
              <>
                {label === nextUnlockText ? (
                  <div className={classes.unlockWrapper}>
                    {label}

                    <Typography className={classes.unlockValue} color="primary">
                      {getNextUnlockTime(nextUnlock)}
                    </Typography>
                  </div>
                ) : (
                  label
                )}
              </>
            }
          />
        ))}
      </TableHead>

      <TableBody>
        {isLoading && renderedSkeletonRows}

        {!isLoading &&
          data?.map((row, i) => (
            <TableRow key={uid(i)}>
              <TableBodyCell label={`${captions[ELabel.totalStaked].label}`}>
                <AmountWithIcon
                  amount={row.totalStaked}
                  ankrFees={row.ankrFees}
                  apy={row.apy}
                  refBonuses={row.refBonuses}
                  refPercent={row.refPercent}
                  token={row.token}
                />
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.pendingRewards].label}`}>
                <BaseTokenUsdAmount
                  amount={row.pendingRewards}
                  usdAmount={row.pendingRewardsUsd}
                />
              </TableBodyCell>

              <TableBodyCell
                label={`${captions[ELabel.claimableRewards].label}`}
              >
                <BaseTokenUsdAmount
                  amount={row.claimableRewards}
                  usdAmount={row.claimableRewardsUsd}
                />
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.nextUnlock].label}`}>
                <NavLink
                  className={classes.btn}
                  href={row.claimLink}
                  variant="contained"
                >
                  {t('referrals.stats-table.claim')}
                </NavLink>
              </TableBodyCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
