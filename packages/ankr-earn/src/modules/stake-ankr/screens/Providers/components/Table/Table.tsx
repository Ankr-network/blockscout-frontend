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

import expandNodeProviders from '../../assets/expand-node-providers.png';
import { useTableData } from '../../hooks/useTableData';
import { ButtonsItem } from '../ButtonsItem';
import { ProviderItem } from '../ProviderItem';

import { useTableStyles } from './useTableStyles';

const SKELETON_ROWS_COUNT = 3;
const SKELETON_COLUMN_WIDTHS = [200, 150, 150];
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

  const renderStakedPool = (value: number, percent: number): string => {
    return `${value} (${Math.trunc(percent)}%)`;
  };

  if (!data?.length && !isLoading) {
    return null;
  }

  return (
    <BasicTable
      columnsCount={captions.length}
      customCell="1fr 250px 300px 200px"
      minWidth={1120}
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
                <ProviderItem
                  name={row.provider}
                  nodeAmount={row.nodeAmount}
                  statusSlot={
                    <ProviderStatus
                      tooltipSlot={
                        <ProviderStatusTooltip
                          currentPeriod={10}
                          latency={40}
                          status={row.status}
                          successRate={20}
                          totalPeriod={20}
                        />
                      }
                      type={row.status}
                    />
                  }
                />
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

        {!!data.length && (
          <img
            alt=""
            className={classes.expandLogo}
            src={expandNodeProviders}
          />
        )}
      </TableBody>
    </BasicTable>
  );
};
