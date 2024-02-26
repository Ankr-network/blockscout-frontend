import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import {
  FEATURE_TABLE_ROW,
  FIRST_ROWS_INDEXES,
  INTL_PLAN_COMPARISON_ROOT,
  PLAN_COMPARISON,
  SECOND_ROWS_INDEXES,
  SUB_ROW_NUMBERS,
} from './FeatureTableUtils';
import { useFeatureTableStyles } from './useFeatureTableStyles';
import { FeatureItem } from '../FeatureContent';

export const FeatureTable = () => {
  const { classes, cx } = useFeatureTableStyles();

  const renderBodyRows = useCallback(
    (rows: number[]) => {
      return rows.map(rowIndex => {
        const isRowSubtitle = SUB_ROW_NUMBERS.includes(rowIndex);

        return (
          <TableRow key={`column-${rowIndex}`} className={classes.row}>
            <TableCell className={classes.name}>
              <Typography
                variant="subtitle2"
                className={cx(isRowSubtitle && classes.rowSubtitle)}
              >
                {t(`${INTL_PLAN_COMPARISON_ROOT}.name-${rowIndex}`)}
              </Typography>
            </TableCell>
            {FEATURE_TABLE_ROW.map(index => (
              <TableCell key={`column-${rowIndex}-row-${index + 1}`}>
                {FeatureItem({ index, rowIndex })}
              </TableCell>
            ))}
          </TableRow>
        );
      });
    },
    [classes, cx],
  );

  return (
    <>
      <Typography variant="h3" className={classes.title}>
        {t(`${INTL_PLAN_COMPARISON_ROOT}.title`)}
      </Typography>
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell />
              {PLAN_COMPARISON.map(name => (
                <TableCell key={`title-${name}`} className={name}>
                  <Typography variant="subtitle1">
                    {t(`${INTL_PLAN_COMPARISON_ROOT}.${name}.title`)}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell />
              {PLAN_COMPARISON.map(name => (
                <TableCell key={`summary-${name}`}>
                  <Typography variant="body2">
                    {t(`${INTL_PLAN_COMPARISON_ROOT}.${name}.summary`)}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={classes.subtitleRow}>
              <Typography variant="h6" className={classes.sectionTitle}>
                {t(`${INTL_PLAN_COMPARISON_ROOT}.features`)}
              </Typography>
            </TableRow>
            {renderBodyRows(FIRST_ROWS_INDEXES)}
            <TableRow
              className={cx(classes.subtitleRow, classes.rowWithoutBorder)}
            >
              <Typography variant="h6" className={classes.sectionTitle}>
                {t(`${INTL_PLAN_COMPARISON_ROOT}.products`)}
              </Typography>
            </TableRow>
          </TableBody>
          {renderBodyRows(SECOND_ROWS_INDEXES)}
        </Table>
      </div>
    </>
  );
};
