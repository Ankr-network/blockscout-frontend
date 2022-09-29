import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { format } from 'date-fns';
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
import { iconByTokenMap, TIconMap } from 'modules/common/icons';
import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { BaseAmount } from 'modules/referrals/components/BaseAmount';

import { useReferrals } from '../../hooks/useReferrals';

import { useReferralsTableStyles } from './useReferralsTableStyles';

const SKELETON_ROWS_COUNT = 1;
const SKELETON_COLUMN_WIDTHS = [200, 200, 200, 200, 200];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

enum ELabel {
  registrationDate,
  address,
  stakedTokens,
  stakedAmount,
  myRewards,
}

interface IReferralTableProps {
  searchAddress?: string;
}

export const ReferralsTable = ({
  searchAddress,
}: IReferralTableProps): JSX.Element | null => {
  const classes = useReferralsTableStyles();

  const { data, isLoading } = useReferrals({ searchAddress });

  const captions = useLocaleMemo(
    () => [
      {
        label: t('referrals.referrals-table.registration-date'),
      },
      {
        label: t('referrals.referrals-table.address'),
      },
      {
        label: t('referrals.referrals-table.staked-tokens'),
      },
      {
        label: t('referrals.referrals-table.staked-amount'),
      },
      {
        label: t('referrals.referrals-table.my-rewards'),
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
      columnsCount={captions.length}
      customCell="1fr 1fr 1fr 1fr 1fr"
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
            const Icon =
              iconByTokenMap[row.stakedTokens as keyof TIconMap] ?? 'span';

            return (
              <TableRow key={uid(i)}>
                <TableBodyCell
                  label={`${captions[ELabel.registrationDate].label}`}
                >
                  <Typography className={classes.simpleText}>
                    {t('referrals.referrals-table.date', {
                      day: format(row.registrationDate, 'dd'),
                      month: format(row.registrationDate, 'LL'),
                      year: format(row.registrationDate, 'yyyy'),
                    })}
                  </Typography>
                </TableBodyCell>

                <TableBodyCell label={`${captions[ELabel.address].label}`}>
                  <Typography className={classes.simpleText}>
                    {getShortTxHash(row.address, 7)}
                  </Typography>
                </TableBodyCell>

                <TableBodyCell label={`${captions[ELabel.stakedTokens].label}`}>
                  <Typography className={classes.simpleText}>
                    <Icon className={classes.icon} />
                  </Typography>
                </TableBodyCell>

                <TableBodyCell label={`${captions[ELabel.stakedAmount].label}`}>
                  <div className={classes.amount}>
                    <BaseAmount
                      amount={row.stakedAmount}
                      token={row.stakedTokens}
                      usdAmount={row.stakedAmountUsd}
                    />
                  </div>
                </TableBodyCell>

                <TableBodyCell label={`${captions[ELabel.myRewards].label}`}>
                  <div className={classes.amount}>
                    <BaseAmount
                      amount={row.myRewards}
                      token={row.stakedTokens}
                      usdAmount={row.myRewardsUsd}
                    />
                  </div>
                </TableBodyCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
