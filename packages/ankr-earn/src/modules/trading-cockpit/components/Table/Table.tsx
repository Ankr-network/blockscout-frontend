import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
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
import { WithUseStyles } from 'modules/themes/types';
import { ReactNode, ReactText } from 'react';
import { uid } from 'react-uid';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
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
  inToken: string;
  outToken: string;
  isLoading?: boolean;
}

export const TableComponent = ({
  data,
  inToken,
  outToken,
  isLoading,
}: ITableProps) => {
  const classes = useTableStyles();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('trading-cockpit.table.name'),
      },
      {
        label: `${inToken}/${outToken}`,
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
    [inToken, outToken],
  );

  const commontTdProps = {
    className: classes.td,
  };

  if (!data?.length && !isLoading) {
    return null;
  }

  return (
    <BasicTable
      columnsCount={captions.length}
      customCell="1fr 152px 230px 210px 175px 130px"
      minWidth={1100}
      paddingCollapse
    >
      <TableHead className={classes.tableHead}>
        {captions.map(({ label, tip }, i) => (
          <TableHeadCell
            key={uid(i)}
            className={classes.th}
            classes={{
              content: classes.thContent,
            }}
            label={
              <>
                {label}

                {tip && (
                  <Tooltip title={tip}>
                    <IconButton className={classes.question}>
                      <QuestionIcon size="xs" />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            }
          />
        ))}
      </TableHead>

      <TableBody>
        {isLoading &&
          SKELETON_ROWS.map((columnWidths, i) => (
            <TableRow key={uid(i)}>
              {columnWidths.map((width, j) => (
                <TableBodyCell
                  {...commontTdProps}
                  label={captions[j].label}
                  key={uid(`${i}-${j}`)}
                >
                  <Skeleton width={width} />
                </TableBodyCell>
              ))}

              <TableBodyCell
                {...commontTdProps}
                label={captions[columnWidths.length].label}
              >
                <Skeleton
                  className={classes.btnSkeleton}
                  width="100%"
                  height={40}
                  variant="rect"
                />
              </TableBodyCell>
            </TableRow>
          ))}

        {!isLoading &&
          data?.map((row, i) => (
            <TableRow key={uid(i)}>
              <TableBodyCell {...commontTdProps} label={`${captions[0].label}`}>
                <ExChange title={row.paltform} iconSlot={row.iconSlot} />
              </TableBodyCell>

              <TableBodyCell {...commontTdProps} label={`${captions[1].label}`}>
                {row.ratio}
              </TableBodyCell>

              <TableBodyCell {...commontTdProps} label={`${captions[2].label}`}>
                <CellPercentageValue
                  value={row.fairValue}
                  text={
                    row.fairValue === 0
                      ? t('trading-cockpit.table.fair-value')
                      : ''
                  }
                />
              </TableBodyCell>

              <TableBodyCell {...commontTdProps} label={`${captions[3].label}`}>
                <CellPercentageValue value={row.priceDiff} />
              </TableBodyCell>

              <TableBodyCell {...commontTdProps} label={`${captions[4].label}`}>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  component="strong"
                  className={classes.outValue}
                >
                  <span title={`${row.youGet} ${outToken}`}>
                    {`${row.youGet} ${outToken}`}
                  </span>
                </Typography>
              </TableBodyCell>

              <TableBodyCell
                {...commontTdProps}
                label={`${captions[5].label}`}
                align="right"
              >
                {row.btnSlot}
              </TableBodyCell>
            </TableRow>
          ))}
      </TableBody>
    </BasicTable>
  );
};
