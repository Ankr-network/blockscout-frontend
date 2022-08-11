import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
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
import {
  ProviderStatus,
  ProviderStatusTooltip,
} from 'modules/delegate-stake/components/ProviderStatus';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { EProviderStatus } from 'modules/stake-ankr/const';
import { NavLink } from 'uiKit/NavLink';

import { ProviderCell } from '../ProviderCell';

import { useProvidersTableStyles } from './useProvidersTableStyles';

const SKELETON_ROWS_COUNT = 3;
const SKELETON_COLUMN_WIDTHS = [200, 100, 150];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

enum ECellLabels {
  providerName,
  apy,
  stakedPool,
  providerLink,
}

export interface IProvidersTableRow {
  providerName: string;
  status: EProviderStatus;
  apy: string;
  stakedPool: string;
  stakedPoolPercent: number;
  providerLink: string;
  latency?: number;
  currentPeriod?: number;
  totalPeriod?: number;
  successRate?: number;
}

interface IProvidersTableProps {
  data?: IProvidersTableRow[];
  isLoading?: boolean;
}

export const ProvidersTable = ({
  data,
  isLoading,
}: IProvidersTableProps): JSX.Element | null => {
  const classes = useProvidersTableStyles();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('stake-ankr.select-provider.table.node-provider'),
      },
      {
        label: t('stake-ankr.select-provider.table.apy'),
      },
      {
        label: t('stake-ankr.select-provider.table.staked-pool'),
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

          <TableBodyCell
            align="right"
            label={captions[columnWidths.length].label}
          >
            <Skeleton className={classes.skeletonBtn} variant="rect" />
          </TableBodyCell>
        </TableRow>
      )),
    [captions, classes],
  );

  if (!data?.length && !isLoading) {
    return null;
  }

  const renderStakedPool = (value: string, percent: number): string => {
    return `${value} (${Math.trunc(percent)}%)`;
  };

  const commonTdProps = {
    className: classes.cell,
  };

  return (
    <BasicTable
      columnsCount={captions.length}
      customCell="1fr 250px 250px 1fr"
      minWidth={1000}
    >
      <TableHead>
        {captions.map(({ label }, i) => (
          <TableHeadCell key={uid(i)} className={classes.cell} label={label} />
        ))}
      </TableHead>

      <TableBody>
        {isLoading && renderedSkeletonRows}

        {!isLoading &&
          data?.map((row, i) => {
            const hasSuccessRate = typeof row.successRate !== 'undefined';
            const hasLatency = typeof row.latency !== 'undefined';
            const hasCurrentPeriod = typeof row.currentPeriod !== 'undefined';
            const hasTotaltPeriod = typeof row.totalPeriod !== 'undefined';

            const hasData =
              hasSuccessRate ||
              hasLatency ||
              hasCurrentPeriod ||
              hasTotaltPeriod;

            return (
              <TableRow key={uid(i)} className={classes.row}>
                <TableBodyCell
                  {...commonTdProps}
                  className={classNames(
                    commonTdProps.className,
                    classes.cellProvider,
                  )}
                  label={`${captions[ECellLabels.providerName].label}`}
                >
                  <ProviderCell
                    nodesCount={0}
                    statusSlot={
                      <ProviderStatus
                        tooltipSlot={
                          hasData && (
                            <ProviderStatusTooltip
                              currentPeriod={row.currentPeriod}
                              latency={row.latency}
                              status={row.status}
                              successRate={row.successRate}
                              totalPeriod={row.totalPeriod}
                            />
                          )
                        }
                        type={row.status}
                      />
                    }
                    title={row.providerName}
                  />
                </TableBodyCell>

                <TableBodyCell
                  {...commonTdProps}
                  label={`${captions[ECellLabels.apy].label}`}
                >
                  {t('stake-ankr.table.percent-value', { value: row.apy })}
                </TableBodyCell>

                <TableBodyCell
                  {...commonTdProps}
                  label={`${captions[ECellLabels.stakedPool].label}`}
                >
                  {renderStakedPool(row.stakedPool, row.stakedPoolPercent)}
                </TableBodyCell>

                <TableBodyCell
                  {...commonTdProps}
                  align="right"
                  label={`${captions[ECellLabels.providerLink].label}`}
                >
                  <NavLink
                    className={classes.btn}
                    href={row.providerLink}
                    variant="contained"
                  >
                    {t('stake-ankr.select-provider.table.btn')}
                  </NavLink>
                </TableBodyCell>
              </TableRow>
            );
          })}
      </TableBody>
    </BasicTable>
  );
};
