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
import { LockingPeriodItem } from 'modules/stake-ankr/components/LockingPeriodItem';
import { RewardsItem } from 'modules/stake-ankr/components/RewardsItem';
import { YourStakeItem } from 'modules/stake-ankr/components/YourStakeItem';

import { useStakeData } from '../../hooks/useStakeData';

import { useStakeInfoStyles } from './useStakeInfoStyles';

const SKELETON_ROWS_COUNT = 1;
const SKELETON_COLUMN_WIDTHS = [200, 200, 200];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

enum ELabel {
  lockingPeriod,
  yourStake,
  rewards,
}

const TEST_PROVIDER_ID = '0x100dd6c27454cb1DAdd1391214A344C6208A8C80';

export const MyStakeTable = (): JSX.Element | null => {
  const classes = useStakeInfoStyles();

  const { data, isLoading } = useStakeData(TEST_PROVIDER_ID);

  const captions = useLocaleMemo(
    () => [
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
      dense
      className={classes.table}
      columnsCount={captions.length}
      customCell="1fr 1fr 1fr"
      minWidth={600}
    >
      <TableHead>
        {captions.map(({ label }, i) => (
          <TableHeadCell
            key={uid(i)}
            className={classes.thContent}
            label={<>{label}</>}
          />
        ))}
      </TableHead>

      <TableBody>
        {isLoading && renderedSkeletonRows}

        {!isLoading &&
          data?.map((row, i) => (
            <TableRow key={uid(i)}>
              <TableBodyCell
                className={classes.cell}
                label={`${captions[ELabel.lockingPeriod].label}`}
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
    </BasicTable>
  );
};
