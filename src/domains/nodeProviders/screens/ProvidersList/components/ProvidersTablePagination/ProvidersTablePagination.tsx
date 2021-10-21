import React, { useMemo } from 'react';
import { Box, Fab, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';
import { useIsSMDown } from 'modules/themes/useTheme';
import { useStyles } from './ProvidersTablePaginationStyles';
import { getPageNumbers } from './ProvidersTablePaginationUtils';

interface ProvidersTablePaginationProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  pageIndex: number;
  pagesCount: number;
  onPageChange: (newPageIndex: number) => void;
}

export const ProvidersTablePagination = ({
  isFirstPage,
  isLastPage,
  pageIndex,
  pagesCount,
  onPageChange,
}: ProvidersTablePaginationProps) => {
  const classes = useStyles();
  const isMobile = useIsSMDown();

  const pageNumbers = useMemo(
    () => getPageNumbers(isMobile, pagesCount, pageIndex),
    [isMobile, pagesCount, pageIndex],
  );

  const dots = (
    <Typography className={classes.dots} color="textSecondary">
      ...
    </Typography>
  );

  return (
    <Box className={classes.root}>
      <Fab
        className={classes.fab}
        variant="extended"
        disabled={isFirstPage}
        onClick={() => onPageChange(pageIndex - 1)}
        aria-label={t('providers.table.pagination.previous-button')}
      >
        {t('providers.table.pagination.previous-button')}
      </Fab>
      {pageIndex > 0 && pagesCount > pageNumbers.length && dots}
      {pageNumbers.map((pageNumber: number, index: number) => (
        <Fab
          className={classNames(classes.fab, {
            [classes.isActive]: pageNumber - 1 === pageIndex,
          })}
          variant="extended"
          onClick={() => onPageChange(index)}
          key={index}
        >
          {pageNumber}
        </Fab>
      ))}
      {pageIndex !== pagesCount - 1 && pagesCount > pageNumbers.length && dots}
      <Fab
        className={classes.fab}
        disabled={isLastPage}
        variant="extended"
        onClick={() => onPageChange(pageIndex + 1)}
        aria-label={t('providers.table.pagination.next-button')}
      >
        {t('providers.table.pagination.next-button')}
      </Fab>
    </Box>
  );
};
