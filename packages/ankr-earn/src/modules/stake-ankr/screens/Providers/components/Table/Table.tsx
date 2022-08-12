import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMemo } from 'react';
import { uid } from 'react-uid';

import { t, tHTML } from 'common';

import {
  Table as BasicTable,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'modules/common/components/TableComponents';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { useTableData } from '../../hooks/useTableData';
import { ButtonsItem } from '../ButtonsItem';

import chainImage from './assets/chains.png';
import { useTableStyles } from './useTableStyles';

const SKELETON_ROWS_COUNT = 3;
const SKELETON_COLUMN_WIDTHS = [200, 200, 200];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

export const Table = (): JSX.Element | null => {
  const classes = useTableStyles();

  const { data, isLoading } = useTableData();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('stake-ankr.table.node-provider'),
      },
      {
        label: t('stake-ankr.table.apy'),
      },
      {
        label: t('stake-ankr.table.staked-pool'),
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

          <TableBodyCell label={captions[columnWidths.length].label}>
            <Skeleton
              className={classes.btnSkeleton}
              height={40}
              variant="rect"
              width="100%"
            />
          </TableBodyCell>
        </TableRow>
      )),
    [captions, classes],
  );

  const renderStakedPool = (value: string, percent: number): string => {
    return `${value} (${Math.trunc(percent)}%)`;
  };

  if (!data?.length && !isLoading) {
    return null;
  }

  return (
    <>
      <BasicTable
        columnsCount={captions.length}
        customCell="1fr 1fr 1fr 200px"
        minWidth={600}
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
                <TableBodyCell label={`${captions[0].label}`}>
                  {row.provider}
                </TableBodyCell>

                <TableBodyCell label={`${captions[1].label}`}>
                  {t('stake-ankr.table.percent-value', { value: row.apy })}
                </TableBodyCell>

                <TableBodyCell label={`${captions[2].label}`}>
                  {renderStakedPool(row.stakedPool, row.stakedPoolPercent)}
                </TableBodyCell>

                <TableBodyCell align="right" label={`${captions[3].label}`}>
                  <ButtonsItem
                    bondingDays={row.bondingDays}
                    detailsLink={row.detailsLink}
                    exitDays={row.exitDays}
                    stakeLink={row.stakeLink}
                  />
                </TableBodyCell>
              </TableRow>
            ))}
        </TableBody>
      </BasicTable>

      <div className={classes.bannerWrapper}>
        {!!data.length && (
          <img alt="" className={classes.expandLogo} src={chainImage} />
        )}

        <Typography className={classes.expandDescription} variant="h2">
          {tHTML('stake-ankr.table.expand-description')}
        </Typography>
      </div>
    </>
  );
};
