import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { t } from '@ankr.com/common';

import {
  COLUMNS_COUNT,
  FEATURE_TABLE_ROW,
  INTL_PLAN_COMPARISON_ROOT,
  PLAN_COMPARISON,
} from './FeatureTableUtils';
import { useFeatureTableStyles } from './useFeatureTableStyles';
import { FeatureItem } from '../FeatureContent';

export const FeatureTable = () => {
  const { classes } = useFeatureTableStyles();

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
            {new Array(COLUMNS_COUNT).fill('').map((_, rowIndex) => (
              <TableRow key={`column-${rowIndex}`} className={classes.row}>
                <TableCell className={classes.name}>
                  <Typography variant="subtitle2">
                    {t(`${INTL_PLAN_COMPARISON_ROOT}.name-${rowIndex + 1}`)}
                  </Typography>
                </TableCell>
                {FEATURE_TABLE_ROW.map(index => (
                  <TableCell key={`column-${rowIndex}-row-${index + 1}`}>
                    {FeatureItem({ index, rowIndex: rowIndex + 1 })}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
