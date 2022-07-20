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
import { LockingPeriodItem } from 'modules/stake-ankr/components/LockingPeriodItem';
import {
  ProviderStatus,
  ProviderStatusTooltip,
} from 'modules/stake-ankr/components/ProviderStatus';
import { RewardsItem } from 'modules/stake-ankr/components/RewardsItem';
import { YourStakeItem } from 'modules/stake-ankr/components/YourStakeItem';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

import { useActiveStakingData } from '../../hooks/useActiveStakingData';

import { DateTimeItem } from './DateTimeItem';
import { ProviderItem } from './ProviderItem';
import { useActiveStakingTableStyles } from './useActiveStakingTableStyles';

const SKELETON_ROWS_COUNT = 3;
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

enum EExpandLabel {
  time,
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

  const expandCaptions = useLocaleMemo(
    () => [
      {
        label: t('stake-ankr.staking-table.time'),
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
            <TableBodyCell
              key={uid(`${i}-${j}`)}
              label={expandCaptions[j].label}
            >
              <Skeleton width={width} />
            </TableBodyCell>
          ))}
        </TableRow>
      )),
    [expandCaptions],
  );

  if (!data?.length && !isLoading) {
    return null;
  }

  return (
    <Table
      expandable
      className={classes.table}
      columnsCount={mainCaptions.length}
      customCell="200px 220px 300px 1fr"
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
            const unstakeLink =
              row.isUnlocked ||
              row.detailedData?.some(stake => stake.isUnlocked)
                ? RoutesConfig.unstake.generatePath(row.provider)
                : undefined;

            const claimLink =
              row.isUnlocked ||
              row.detailedData?.every(stake => stake.isUnlocked)
                ? RoutesConfig.claim.generatePath(row.provider)
                : undefined;

            const restakeLink =
              row.isUnlocked ||
              row.detailedData?.every(stake => stake.isUnlocked)
                ? RoutesConfig.restake.generatePath(row.provider)
                : undefined;

            return (
              <TableRow
                key={uid(i)}
                className={classes.row}
                expandSlot={
                  !!row.detailedData?.length && (
                    <div className={classes.expandWrapper}>
                      <Table
                        dense
                        className={classes.expandTable}
                        columnsCount={mainCaptions.length}
                        customCell="160px 220px 300px 1fr"
                        minWidth={800}
                      >
                        <TableHead>
                          {expandCaptions.map(({ label }, index) => (
                            <TableHeadCell
                              key={uid(index)}
                              classes={{
                                content: classes.thContent,
                              }}
                              label={<>{label}</>}
                            />
                          ))}
                        </TableHead>

                        <TableBody>
                          {row.detailedData.map((additionalInfoItem, j) => (
                            <TableRow
                              key={uid(j)}
                              className={classes.expandedRow}
                            >
                              <TableBodyCell
                                className={classes.expandedCell}
                                label={`${
                                  expandCaptions[EExpandLabel.time].label
                                }`}
                              >
                                <DateTimeItem
                                  dateTime={additionalInfoItem.date}
                                />
                              </TableBodyCell>

                              <TableBodyCell
                                className={classes.expandedCell}
                                label={`${
                                  expandCaptions[EExpandLabel.lockPeriod].label
                                }`}
                              >
                                <LockingPeriodItem
                                  daysLeft={additionalInfoItem.lockingPeriod}
                                  isUnlocked={additionalInfoItem.isUnlocked}
                                  percent={
                                    additionalInfoItem.lockingPeriodPercent
                                  }
                                />
                              </TableBodyCell>

                              <TableBodyCell
                                className={classes.expandedCell}
                                label={`${
                                  expandCaptions[EExpandLabel.yourStake].label
                                }`}
                              >
                                <YourStakeItem
                                  ankrAmount={additionalInfoItem.stakeAmount}
                                  usdAmount={additionalInfoItem.usdStakeAmount}
                                />
                              </TableBodyCell>

                              <TableBodyCell
                                className={classes.expandedCell}
                                label={`${
                                  expandCaptions[EExpandLabel.rewards].label
                                }`}
                              >
                                <RewardsItem
                                  ankrAmount={additionalInfoItem.rewards}
                                  usdAmount={additionalInfoItem.usdRewards}
                                />
                              </TableBodyCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )
                }
              >
                <TableBodyCell
                  className={classes.cell}
                  label={`${expandCaptions[EMainLabel.provider].label}`}
                >
                  <ProviderItem
                    name={getDemoProviderName(row.provider) ?? row.provider}
                    nodeAPY={row.apy}
                    statusSlot={
                      <ProviderStatus
                        tooltipSlot={
                          <ProviderStatusTooltip
                            currentPeriod={10}
                            latency={40}
                            status={row.status}
                            successRate={20}
                            totalPeriod={10}
                          />
                        }
                        type={row.status}
                      />
                    }
                  />
                </TableBodyCell>

                <TableBodyCell
                  className={classes.cell}
                  label={`${expandCaptions[EMainLabel.lockPeriod].label}`}
                >
                  <LockingPeriodItem
                    daysLeft={row.lockingPeriod}
                    existingStakes={row.detailedData?.length}
                    isUnlocked={row.isUnlocked}
                    percent={row.lockingPeriodPercent}
                  />
                </TableBodyCell>

                <TableBodyCell
                  className={classes.cell}
                  label={`${expandCaptions[EMainLabel.yourStake].label}`}
                >
                  <YourStakeItem
                    ankrAmount={row.stakeAmount}
                    stakeLink={RoutesConfig.stakeMore.generatePath(
                      row.provider,
                    )}
                    unstakeLink={unstakeLink}
                    usdAmount={row.usdStakeAmount}
                  />
                </TableBodyCell>

                <TableBodyCell
                  className={classes.cell}
                  label={`${expandCaptions[EMainLabel.rewards].label}`}
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
