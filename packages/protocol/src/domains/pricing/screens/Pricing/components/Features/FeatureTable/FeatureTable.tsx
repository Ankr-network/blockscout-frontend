import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { t, tHTML } from '@ankr.com/common';
import { COLUMNS_COUNT, intlRoot } from './FeatureTableUtils';
import { useFeatureTableStyles } from './useFeatureTableStyles';
import { LearnMore } from '../LearnMore/LearnMore';
import { PREMIUM_BLOCK_ANCHOR } from '../../PremiumBlock';
import { TableContent } from './TableContent';

export const FeatureTable = () => {
  const classes = useFeatureTableStyles();

  return (
    <Table className={classes.root}>
      <TableHead className={classes.row}>
        <TableRow className={classes.header}>
          {new Array(COLUMNS_COUNT).fill('').map((_, index) => (
            <TableCell key={`header-${index}`}>
              {tHTML(`${intlRoot}.header.column-${index + 1}`)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow className={classes.headerSummary}>
          {new Array(COLUMNS_COUNT).fill('').map((_, index) => (
            <TableCell key={`summary-${index}`}>
              {tHTML(`${intlRoot}.header-summary.column-${index + 1}`)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableContent />
        <TableRow className={classes.cellRow}>
          <TableCell>
            <LearnMore />
          </TableCell>
          <TableCell className={classes.button}>
            <Button disabled>{t(`${intlRoot}.header-button.column-2`)}</Button>
          </TableCell>
          <TableCell className={classes.button}>
            <Button href={`#${PREMIUM_BLOCK_ANCHOR}`}>
              {t(`${intlRoot}.header-button.column-3`)}
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
