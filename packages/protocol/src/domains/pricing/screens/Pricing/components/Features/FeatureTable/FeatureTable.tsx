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
  FEATURE_TABLE_COLUMNS,
  FIRST_ROWS_INDEXES,
  INTL_PLAN_COMPARISON_ROOT,
  PLAN_COMPARISON,
  ROWS_COUNT,
  SECOND_ROWS_INDEXES,
  SUB_ROW_NUMBERS,
  THIRD_ROWS_INDEXES,
  getPlanLabelByName,
} from './FeatureTableUtils';
import { useFeatureTableStyles } from './useFeatureTableStyles';
import { FeatureItem } from '../FeatureContent';
import { PlanLabel } from '../../PlanLabel';

export const FeatureTable = () => {
  const { classes, cx } = useFeatureTableStyles();

  const renderBodyRows = useCallback(
    (rows: number[]) => {
      return rows.map(rowIndex => {
        const isRowSubtitle = SUB_ROW_NUMBERS.includes(rowIndex);
        const isLastRow = rowIndex === ROWS_COUNT;

        return (
          <TableRow
            key={`column-${rowIndex}`}
            className={cx(classes.row, isLastRow && classes.rowWithoutBorder)}
          >
            <TableCell className={classes.name}>
              <Typography
                variant="subtitle2"
                className={cx(
                  classes.subtitle,
                  isRowSubtitle && classes.rowSubtitle,
                )}
              >
                {t(`${INTL_PLAN_COMPARISON_ROOT}.name-${rowIndex}`)}
              </Typography>
            </TableCell>
            {FEATURE_TABLE_COLUMNS.map(index => (
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
      <Typography variant="h4" className={classes.title}>
        {t(`${INTL_PLAN_COMPARISON_ROOT}.title`)}
      </Typography>
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell />
              {PLAN_COMPARISON.map(name => (
                <TableCell key={`title-${name}`} className={name}>
                  <div className={classes.headerCell}>
                    <Typography variant="subtitle2">
                      {t(`${INTL_PLAN_COMPARISON_ROOT}.${name}.title`)}
                    </Typography>
                    <PlanLabel plan={getPlanLabelByName(name)} />
                  </div>
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
            {renderBodyRows(SECOND_ROWS_INDEXES)}
            <TableRow
              className={cx(classes.subtitleRow, classes.rowWithoutBorder)}
            >
              <Typography variant="h6" className={classes.sectionTitle}>
                {t(`${INTL_PLAN_COMPARISON_ROOT}.pricing`)}
              </Typography>
            </TableRow>
            {renderBodyRows(THIRD_ROWS_INDEXES)}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
