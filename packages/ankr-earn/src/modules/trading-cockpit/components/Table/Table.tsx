import { ButtonBase } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ReactNode, ReactText, useMemo } from 'react';
import { uid } from 'react-uid';

import { WithUseStyles } from 'ui';

import {
  Table as BasicTable,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'modules/common/components/TableComponents';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { CellPercentageValue } from '../CellPercentageValue';
import { ExChange } from '../ExChange';

import { useTableStyles } from './useTableStyles';

const SKELETON_ROWS_COUNT = 3;
const SKELETON_COLUMN_WIDTHS = [110, 30, 100, 30, 40];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

export interface ITableRow {
  paltform: string;
  iconSlot: ReactNode;
  ratio: ReactText;
  fairValue: number;
  priceDiff: number;
  youGet: ReactText;
  btnSlot: JSX.Element;
}

interface ITableProps extends Partial<WithUseStyles<typeof useTableStyles>> {
  data?: ITableRow[];
  outToken: string;
  isLoading?: boolean;
}

export const TableComponent = ({
  data,
  outToken,
  isLoading,
}: ITableProps): JSX.Element | null => {
  const classes = useTableStyles();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('trading-cockpit.table.name'),
      },
      {
        label: t('trading-cockpit.table.rate'),
      },
      {
        label: t('trading-cockpit.table.difference'),
        tip: t('trading-cockpit.table.difference-tip'),
      },
      {
        label: t('trading-cockpit.table.est-price'),
        tip: t('trading-cockpit.table.est-price-tip'),
      },
      {
        label: t('trading-cockpit.table.you-get'),
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
    <BasicTable
      columnsCount={captions.length}
      customCell="1fr 145px 235px 210px 155px 165px"
      minWidth={1120}
    >
      <TableHead>
        {captions.map(({ label, tip }, i) => (
          <TableHeadCell
            key={uid(i)}
            classes={{
              content: classes.thContent,
            }}
            label={
              <>
                {label}

                {tip && (
                  <Tooltip title={tip}>
                    <ButtonBase className={classes.questionBtn}>
                      <QuestionIcon
                        className={classes.questionIcon}
                        size="xs"
                      />
                    </ButtonBase>
                  </Tooltip>
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
                <ExChange
                  className={classes.platform}
                  iconSlot={row.iconSlot}
                  title={row.paltform}
                />
              </TableBodyCell>

              <TableBodyCell label={`${captions[1].label}`}>
                {row.ratio}
              </TableBodyCell>

              <TableBodyCell label={`${captions[2].label}`}>
                <CellPercentageValue
                  text={
                    row.fairValue === 0
                      ? t('trading-cockpit.table.fair-value')
                      : ''
                  }
                  value={row.fairValue}
                />
              </TableBodyCell>

              <TableBodyCell label={`${captions[3].label}`}>
                <CellPercentageValue value={row.priceDiff} />
              </TableBodyCell>

              <TableBodyCell label={`${captions[4].label}`}>
                <span
                  title={t('unit.token-value', {
                    value: row.youGet,
                    token: outToken,
                  })}
                >
                  {t('unit.token-value', {
                    value: row.youGet,
                    token: outToken,
                  })}
                </span>
              </TableBodyCell>

              <TableBodyCell align="right" label={`${captions[5].label}`}>
                {row.btnSlot}
              </TableBodyCell>
            </TableRow>
          ))}
      </TableBody>
    </BasicTable>
  );
};
