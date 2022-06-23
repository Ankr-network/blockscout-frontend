import { Skeleton } from '@material-ui/lab';
import { useMemo } from 'react';
import { uid } from 'react-uid';

import { t } from 'common';

import {
  Table as BasicTable,
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

import { useActiveStakingData } from '../../hooks/useActiveStakingData';

import { LockingPeriodItem } from './LockingPeriodItem/LockingPeriodItem';
import { ProviderItem } from './ProviderItem';
import { RewardsItem } from './RewardsItem';
import { useActiveStakingTableStyles } from './useActiveStakingTableStyles';
import { YourStakeItem } from './YourStakeItem';

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
    <BasicTable
      columnsCount={captions.length}
      customCell="200px 250px 350px 1fr"
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
              <TableBodyCell label={`${captions[ELabel.provider].label}`}>
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

              <TableBodyCell label={`${captions[ELabel.lockPeriod].label}`}>
                <LockingPeriodItem
                  daysLeft={row.lockingPeriod}
                  isUnlocked={row.isUnlocked}
                  percent={row.lockingPeriod}
                />
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.yourStake].label}`}>
                <YourStakeItem
                  ankrAmount={row.stakeAmount}
                  stakeLink={row.stakeLink}
                  unstakeLink={row.unstakeLink}
                  usdAmount={row.usdStakeAmount}
                />
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.rewards].label}`}>
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
    </BasicTable>
  );
};
