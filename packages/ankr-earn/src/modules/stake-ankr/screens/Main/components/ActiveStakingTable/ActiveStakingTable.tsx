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
import {
  ProviderStatus,
  ProviderStatusTooltip,
} from 'modules/stake-ankr/components/ProviderStatus';

import { LockingPeriodItem } from '../../../../common/components/LockingPeriodItem/LockingPeriodItem';
import { RewardsItem } from '../../../../common/components/RewardsItem';
import { YourStakeItem } from '../../../../common/components/YourStakeItem';
import { useActiveStakingData } from '../../hooks/useActiveStakingData';

import { DateTimeItem } from './DateTimeItem';
import { ProviderItem } from './ProviderItem';
import { useActiveStakingTableStyles } from './useActiveStakingTableStyles';

const SKELETON_ROWS_COUNT = 3;
const SKELETON_COLUMN_WIDTHS = [200, 200, 200, 300];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

enum ELabel {
  provider,
  lockPeriod,
  yourStake,
  rewards,
  date,
}

export const ActiveStakingTable = (): JSX.Element | null => {
  const classes = useActiveStakingTableStyles();

  const { data, isLoading } = useActiveStakingData();

  const captions = useLocaleMemo(
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
      {
        label: t('stake-ankr.staking-table.date'),
      },
    ],
    [],
  );

  const mainCaptions = captions.slice(0, -1);

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
      expandable
      className={classes.table}
      columnsCount={mainCaptions.length}
      customCell="200px 250px 300px 1fr"
      minWidth={1200}
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
          data?.map((row, i) => (
            <TableRow
              key={uid(i)}
              className={classes.row}
              expandSlot={
                !!row.detailedData?.length && (
                  <Table
                    className={classes.table}
                    columnsCount={mainCaptions.length}
                    customCell="200px 250px 300px 1fr"
                    minWidth={1100}
                  >
                    <TableBody>
                      {row.detailedData.map((additionalInfoItem, j) => (
                        <TableRow key={uid(j)} className={classes.expandedRow}>
                          <TableBodyCell
                            className={classes.expandedCell}
                            label={`${captions[ELabel.date].label}`}
                          >
                            <DateTimeItem dateTime={additionalInfoItem.date} />
                          </TableBodyCell>

                          <TableBodyCell
                            className={classes.expandedCell}
                            label={`${captions[ELabel.lockPeriod].label}`}
                          >
                            <LockingPeriodItem
                              daysLeft={additionalInfoItem.lockingPeriod}
                              isUnlocked={additionalInfoItem.isUnlocked}
                              percent={additionalInfoItem.lockingPeriod}
                            />
                          </TableBodyCell>

                          <TableBodyCell
                            className={classes.expandedCell}
                            label={`${captions[ELabel.yourStake].label}`}
                          >
                            <YourStakeItem
                              ankrAmount={additionalInfoItem.stakeAmount}
                              stakeLink={additionalInfoItem.stakeLink}
                              unstakeLink={additionalInfoItem.unstakeLink}
                              usdAmount={additionalInfoItem.usdStakeAmount}
                            />
                          </TableBodyCell>

                          <TableBodyCell
                            className={classes.expandedCell}
                            label={`${captions[ELabel.rewards].label}`}
                          >
                            <RewardsItem
                              ankrAmount={additionalInfoItem.rewards}
                              claimLink={additionalInfoItem.claimLink}
                              restakeLink={additionalInfoItem.restakeLink}
                              usdAmount={additionalInfoItem.usdRewards}
                            />
                          </TableBodyCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )
              }
            >
              <TableBodyCell
                className={classes.cell}
                label={`${captions[ELabel.provider].label}`}
              >
                <ProviderItem
                  name={row.provider}
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
                label={`${captions[ELabel.lockPeriod].label}`}
              >
                <LockingPeriodItem
                  daysLeft={row.lockingPeriod}
                  isUnlocked={row.isUnlocked}
                  percent={row.lockingPeriod}
                />
              </TableBodyCell>

              <TableBodyCell
                className={classes.cell}
                label={`${captions[ELabel.yourStake].label}`}
              >
                <YourStakeItem
                  ankrAmount={row.stakeAmount}
                  stakeLink={row.stakeLink}
                  unstakeLink={row.unstakeLink}
                  usdAmount={row.usdStakeAmount}
                />
              </TableBodyCell>

              <TableBodyCell
                className={classes.cell}
                label={`${captions[ELabel.rewards].label}`}
              >
                <RewardsItem
                  ankrAmount={row.rewards}
                  claimLink={row.claimLink}
                  restakeLink={row.restakeLink}
                  usdAmount={row.usdRewards}
                />
              </TableBodyCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
