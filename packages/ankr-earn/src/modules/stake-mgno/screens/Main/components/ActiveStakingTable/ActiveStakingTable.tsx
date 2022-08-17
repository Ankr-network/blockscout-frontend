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
import { Token } from 'modules/common/types/token';
import { BaseTokenUsdAmount } from 'modules/delegate-stake/components/BaseTokenUsdAmount';
import { ProviderItem } from 'modules/delegate-stake/components/ProviderItem';
import { YourStakeItem } from 'modules/delegate-stake/components/YourStakeItem';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { getDemoProviderName } from 'modules/stake-mgno/utils/getDemoProviderName';
import { NavLink } from 'uiKit/NavLink';

import { useActiveStakingData } from '../../hooks/useActiveStakingData';

import { useActiveStakingTableStyles } from './useActiveStakingTableStyles';

const SKELETON_ROWS_COUNT = 3;
const SKELETON_COLUMN_WIDTHS = [200, 200, 200, 300];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

enum ELabel {
  provider,
  slashingProtection,
  yourStake,
  rewards,
  action,
}

export const ActiveStakingTable = (): JSX.Element | null => {
  const classes = useActiveStakingTableStyles();

  const { data, isLoading } = useActiveStakingData();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('stake-mgno.staking-table.node-provider'),
      },
      {
        label: t('stake-mgno.staking-table.slashing-protection'),
      },
      {
        label: t('stake-mgno.staking-table.your-stake'),
      },
      {
        label: t('stake-mgno.staking-table.rewards'),
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
    <Table
      className={classes.table}
      columnsCount={captions.length}
      customCell="250px 200px 250px 250px 1fr"
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
            <TableRow key={uid(i)} className={classes.row}>
              <TableBodyCell
                className={classes.cell}
                label={`${captions[ELabel.provider].label}`}
              >
                <ProviderItem
                  name={getDemoProviderName(row.provider) ?? row.provider}
                  nodeAPY={row.apr}
                />
              </TableBodyCell>

              <TableBodyCell
                className={classes.cell}
                label={`${captions[ELabel.slashingProtection].label}`}
              >
                {t('unit.percentage-value', { value: row.slashingProtection })}
              </TableBodyCell>

              <TableBodyCell
                className={classes.cell}
                label={`${captions[ELabel.yourStake].label}`}
              >
                <YourStakeItem
                  unstakeDisabled
                  amount={row.stakeAmount}
                  stakeLink={' '}
                  token={Token.mGNO}
                  unstakeLink={' '}
                  usdAmount={row.usdStakeAmount}
                />
              </TableBodyCell>

              <TableBodyCell
                className={classes.cell}
                label={`${captions[ELabel.rewards].label}`}
              >
                <BaseTokenUsdAmount
                  amount={row.rewards}
                  token={Token.mGNO}
                  usdAmount={row.usdRewards}
                />
              </TableBodyCell>

              <TableBodyCell
                align="right"
                label={`${captions[ELabel.action].label}`}
              >
                <NavLink className={classes.btn} href=" " variant="outlined">
                  {t('stake-mgno.staking-table.details')}
                </NavLink>
              </TableBodyCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
