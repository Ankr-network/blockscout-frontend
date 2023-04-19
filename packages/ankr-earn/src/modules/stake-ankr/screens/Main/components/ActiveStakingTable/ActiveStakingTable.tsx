import { t } from '@ankr.com/common';
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
import { ProviderItem } from 'modules/delegate-stake/components/ProviderItem';
import { YourStakeItem } from 'modules/delegate-stake/components/YourStakeItem';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { LockingPeriodItem } from 'modules/stake-ankr/components/LockingPeriodItem';
import { RewardsItem } from 'modules/stake-ankr/components/RewardsItem';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

import { RoutesConfig } from '../../../../RoutesConfig';
import { useActiveStakingData } from '../../hooks/useActiveStakingData';

import { DetailedTable } from './DetailedTable';
import { useActiveStakingTableStyles } from './useActiveStakingTableStyles';

const SKELETON_ROWS_COUNT = 1;
const SKELETON_COLUMN_WIDTHS = [200, 200, 200, 300];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

enum EMainLabel {
  provider,
  lockPeriod,
  yourStake,
  rewards,
}

export const ActiveStakingTable = (): JSX.Element | null => {
  const classes = useActiveStakingTableStyles();

  const { data, isLoading } = useActiveStakingData();

  const mainCaptions = useLocaleMemo(
    () => [
      {
        label: t('stake-ankr.staking-table.node-provider'),
      },
      {
        label: t('stake-ankr.staking-table.locking-period'),
      },
      {
        label: t('stake-ankr.staking-table.your-stake'),
      },
      {
        label: t('stake-ankr.staking-table.rewards'),
      },
    ],
    [],
  );

  const renderedSkeletonRows = useMemo(
    () =>
      SKELETON_ROWS.map((columnWidths, i) => (
        <TableRow key={uid(i)}>
          {columnWidths.map((width, j) => (
            <TableBodyCell key={uid(`${i}-${j}`)} label={mainCaptions[j].label}>
              <Skeleton width={width} />
            </TableBodyCell>
          ))}
        </TableRow>
      )),
    [mainCaptions],
  );

  if (!data?.length && !isLoading) {
    return null;
  }

  return (
    <Table
      expandable
      className={classes.table}
      columnsCount={mainCaptions.length}
      customCell="150px 200px 300px 1fr"
      minWidth={800}
    >
      <TableHead>
        {mainCaptions.map(({ label }, i) => (
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
            const isZeroStake = row.stakeAmount.isZero();
            const isZeroRewards = row.rewards.isZero();

            const unstakeLink =
              row.isUnlocked && !isZeroStake
                ? RoutesConfig.unstake.generatePath(row.provider)
                : undefined;
            const claimLink = !row.rewards.isZero()
              ? RoutesConfig.claimRewards.generatePath(row.provider)
              : undefined;
            const restakeLink = !row.rewards.isZero()
              ? RoutesConfig.restake.generatePath(row.provider)
              : undefined;

            if (isZeroStake && isZeroRewards) {
              return null;
            }

            return (
              <TableRow
                key={uid(i)}
                className={classes.row}
                expandSlot={
                  !!row.detailedData?.length && (
                    <div className={classes.expandWrapper}>
                      <DetailedTable
                        columnsCount={mainCaptions.length}
                        detailedData={row.detailedData}
                        provider={row.provider}
                      />
                    </div>
                  )
                }
              >
                <TableBodyCell
                  className={classes.cell}
                  label={`${mainCaptions[EMainLabel.provider].label}`}
                >
                  <ProviderItem
                    name={getDemoProviderName(row.provider) ?? row.provider}
                    nodeAPY={row.apy}
                  />
                </TableBodyCell>

                <TableBodyCell
                  className={classes.cell}
                  label={`${mainCaptions[EMainLabel.lockPeriod].label}`}
                >
                  <LockingPeriodItem
                    daysLeft={row.lockingPeriod}
                    existingStakes={row.detailedData?.length}
                    isPartiallyUnlocked={row.isPartiallyUnlocked}
                    isUnlocked={row.isUnlocked}
                    percent={row.lockingPeriodPercent}
                  />
                </TableBodyCell>

                <TableBodyCell
                  className={classes.cell}
                  label={`${mainCaptions[EMainLabel.yourStake].label}`}
                >
                  <YourStakeItem
                    amount={row.stakeAmount}
                    stakeLink={RoutesConfig.stake.generatePath(row.provider)}
                    token={Token.ANKR}
                    unstakeLink={unstakeLink}
                    usdAmount={row.usdStakeAmount}
                  />
                </TableBodyCell>

                <TableBodyCell
                  className={classes.cell}
                  label={`${mainCaptions[EMainLabel.rewards].label}`}
                >
                  <RewardsItem
                    ankrAmount={row.rewards}
                    claimLink={claimLink}
                    restakeLink={restakeLink}
                    usdAmount={row.usdRewards}
                  />
                </TableBodyCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};