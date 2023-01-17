import { t } from '@ankr.com/common';
import { uid } from 'react-uid';

import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'modules/common/components/TableComponents';
import { Web3Address } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { YourStakeItem } from 'modules/delegate-stake/components/YourStakeItem';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { IAdditionalActiveStakingData } from 'modules/stake-ankr/actions/getActiveStakingData';
import { LockingPeriodItem } from 'modules/stake-ankr/components/LockingPeriodItem';

import { RoutesConfig } from '../../../../RoutesConfig';

import { useActiveStakingTableStyles } from './useActiveStakingTableStyles';

enum EExpandLabel {
  time,
  lockPeriod,
  yourStake,
}

interface IDetailedTableProps {
  detailedData: IAdditionalActiveStakingData[];
  provider: Web3Address;
  columnsCount: number;
}

export const DetailedTable = ({
  detailedData,
  provider,
  columnsCount,
}: IDetailedTableProps): JSX.Element => {
  const classes = useActiveStakingTableStyles();

  const expandCaptions = useLocaleMemo(
    () => [
      {
        label: ' ',
      },
      {
        label: t('stake-ankr.staking-table.locking-period'),
      },
      {
        label: t('stake-ankr.staking-table.your-stake'),
      },
    ],
    [],
  );

  return (
    <Table
      dense
      className={classes.expandTable}
      columnsCount={columnsCount}
      customCell="110px 200px 300px 1fr"
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
        {(detailedData || []).map((additionalInfoItem, j) => {
          const {
            lockingPeriod,
            lockingPeriodPercent,
            isUnlocked,
            stakeAmount,
            usdStakeAmount,
            isUnknownPeriod,
          } = additionalInfoItem;

          const internalUnstakeLink = isUnlocked
            ? RoutesConfig.unstake.generatePath(provider)
            : undefined;

          return (
            <TableRow key={uid(j)} className={classes.expandedRow}>
              <TableBodyCell
                children={undefined}
                className={classes.expandedCell}
                label={' '}
              />

              <TableBodyCell
                className={classes.expandedCell}
                label={`${expandCaptions[EExpandLabel.lockPeriod].label}`}
              >
                <LockingPeriodItem
                  daysLeft={lockingPeriod}
                  isUnknownPeriod={isUnknownPeriod}
                  isUnlocked={isUnlocked}
                  percent={lockingPeriodPercent}
                />
              </TableBodyCell>

              <TableBodyCell
                align="left"
                className={classes.expandedCell}
                label={`${expandCaptions[EExpandLabel.yourStake].label}`}
              >
                <YourStakeItem
                  withTextUnstake
                  amount={stakeAmount}
                  token={Token.ANKR}
                  unstakeLink={internalUnstakeLink}
                  usdAmount={usdStakeAmount}
                />
              </TableBodyCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
