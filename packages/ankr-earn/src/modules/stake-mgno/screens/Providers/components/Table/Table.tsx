import { t } from '@ankr.com/common';
import { Skeleton } from '@material-ui/lab';
import { useMemo } from 'react';
import { uid } from 'react-uid';

import {
  Table as BasicTable,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'modules/common/components/TableComponents';
import { DEFAULT_ROUNDING } from 'modules/common/const';
import { NodeExpandBanner } from 'modules/delegate-stake/components/NodeExpandBanner';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { useTableData } from '../../hooks/useTableData';
import { ButtonsItem } from '../ButtonsItem';
import { ProviderItem } from '../ProviderItem';

import { useTableStyles } from './useTableStyles';

const SKELETON_ROWS_COUNT = 3;
const SKELETON_COLUMN_WIDTHS = [200, 200, 200, 200, 200];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

export const Table = (): JSX.Element | null => {
  const classes = useTableStyles();

  const { data, isLoading } = useTableData();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('stake-mgno.provider.node-provider'),
        tooltip: t('stake-mgno.provider.node-provider-tooltip'),
      },
      {
        label: t('stake-mgno.provider.slashing-protection'),
        tooltip: t('stake-mgno.provider.slashing-protection-tooltip'),
      },
      {
        label: t('stake-mgno.provider.insurance-pool'),
        tooltip: t('stake-mgno.provider.insurance-pool-tooltip'),
      },
      {
        label: t('stake-mgno.provider.staked-available'),
        tooltip: t('stake-mgno.provider.staked-available-tooltip'),
      },
      {
        label: t('stake-mgno.provider.net-apr'),
        tooltip: t('stake-mgno.provider.net-apr-tooltip'),
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

  if (!data?.length && !isLoading) {
    return null;
  }

  return (
    <>
      <BasicTable
        columnsCount={captions.length}
        customCell="1fr 1fr 1fr 1fr 150px 200px"
        minWidth={800}
      >
        <TableHead>
          {captions.map(({ label, tooltip }, i) => (
            <TableHeadCell
              key={uid(i)}
              classes={{
                content: classes.thContent,
              }}
              label={
                <>
                  {label}

                  {tooltip && (
                    <QuestionWithTooltip>{tooltip}</QuestionWithTooltip>
                  )}
                </>
              }
            />
          ))}
        </TableHead>

        <TableBody>
          {isLoading && renderedSkeletonRows}

          {!isLoading &&
            data?.map((row, i) => (
              <TableRow key={uid(i)}>
                <TableBodyCell label={`${captions[0].label}`}>
                  <ProviderItem keys={row.nodeKeys} name={row.providerName} />
                </TableBodyCell>

                <TableBodyCell label={`${captions[1].label}`}>
                  {t('unit.percentage-value', {
                    value: row.slashingProtection.integerValue().toFormat(),
                  })}
                </TableBodyCell>

                <TableBodyCell label={`${captions[2].label}`}>
                  {t('unit.mgno-value', { value: row.insurancePool })}
                </TableBodyCell>

                <TableBodyCell label={`${captions[3].label}`}>
                  {t('unit.mgno-value', {
                    value: `${row.staked
                      .decimalPlaces(DEFAULT_ROUNDING)
                      .toFormat()}/${row.available
                      .decimalPlaces(DEFAULT_ROUNDING)
                      .toFormat()}`,
                  })}
                </TableBodyCell>

                <TableBodyCell label={`${captions[4].label}`}>
                  {t('unit.percentage-value', {
                    value: row.apr.integerValue(),
                  })}
                </TableBodyCell>

                <TableBodyCell align="right" label={`${captions[5].label}`}>
                  <ButtonsItem
                    detailsLink={row.detailsLink}
                    stakeLink={row.stakeLink}
                  />
                </TableBodyCell>
              </TableRow>
            ))}
        </TableBody>
      </BasicTable>

      {!!data.length && <NodeExpandBanner />}
    </>
  );
};
