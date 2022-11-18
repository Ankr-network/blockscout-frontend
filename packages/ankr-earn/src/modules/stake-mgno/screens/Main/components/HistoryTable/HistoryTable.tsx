import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMemo } from 'react';
import { uid } from 'react-uid';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'modules/common/components/TableComponents';
import { SupportedChainIDS } from 'modules/common/const';
import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { DateTimeItem } from 'modules/delegate-stake/components/DateTimeItem';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { NavLink } from 'uiKit/NavLink';

import { useHistoryData } from '../../hooks/useHistoryData';

import { useHistoryTableStyles } from './useHistoryTableStyles';

const SKELETON_ROWS_COUNT = 1;
const SKELETON_COLUMN_WIDTHS = [200, 200, 200, 200, 200];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

enum ELabel {
  date,
  hash,
  event,
  provider,
  amount,
}

export const HistoryTable = (): JSX.Element | null => {
  const classes = useHistoryTableStyles();

  const { chainId } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const { data, isLoading } = useHistoryData();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('stake-mgno.staking-table.date'),
      },
      {
        label: t('stake-mgno.staking-table.hash'),
      },
      {
        label: t('stake-mgno.staking-table.event'),
      },
      {
        label: t('stake-mgno.staking-table.provider'),
      },
      {
        label: t('stake-mgno.staking-table.amount'),
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
          data?.map((row, i) => (
            <TableRow key={uid(i)}>
              <TableBodyCell label={`${captions[ELabel.date].label}`}>
                <DateTimeItem dateTime={row.date} />
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.hash].label}`}>
                <Typography className={classes.simpleText}>
                  <NavLink
                    className={classes.txLink}
                    href={getTxLinkByNetwork(
                      row.hash,
                      (chainId || SupportedChainIDS.MAINNET) as number,
                    )}
                  >
                    {getShortTxHash(row.hash, 8)}
                  </NavLink>
                </Typography>
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.event].label}`}>
                <Typography className={classes.simpleText}>
                  {row.event}
                </Typography>
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.provider].label}`}>
                <Typography className={classes.simpleText}>
                  {row.provider}
                </Typography>
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.amount].label}`}>
                <Typography className={classes.simpleText}>
                  {t('unit.mgno-value', { value: row.amount.toFormat() })}
                </Typography>
              </TableBodyCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
