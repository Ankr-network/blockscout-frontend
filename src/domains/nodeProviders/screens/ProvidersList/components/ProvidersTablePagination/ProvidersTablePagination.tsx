import React from 'react';
import { Box, Fab } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './ProvidersTablePaginationStyles';

interface Props {
  isFirstPage: boolean;
  isLastPage: boolean;
  pageIndex: number;
  pagesCount: number;
  onPageChange: (newPageIndex: number) => void;
}

export const ProvidersTablePagination: React.FC<Props> = ({
  isFirstPage,
  isLastPage,
  pageIndex,
  pagesCount,
  onPageChange,
}) => {
  const classes = useStyles();

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

      {[...Array(pagesCount)].map((value: undefined, index: number) => (
        <Fab
          className={classNames(classes.fab, {
            [classes.isActive]: index === pageIndex,
          })}
          variant="extended"
          onClick={() => onPageChange(index)}
          key={index}
        >
          {index + 1}
        </Fab>
      ))}

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
