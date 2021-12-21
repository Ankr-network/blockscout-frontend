import React, { useMemo } from 'react';
import { Box, Fab, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { uid } from 'react-uid';

import { t } from 'modules/i18n/utils/intl';
import { useIsSMDown } from 'ui';
import { useStyles } from './ProvidersTablePaginationStyles';
import { getPageNumbers } from './ProvidersTablePaginationUtils';

interface ProvidersTablePaginationProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  pageIndex: number;
  pagesCount: number;
  onPageChange: (newPageIndex: number) => void;
}

const PaginationButton = ({
  text,
  onClick,
  className,
  isDisabled = false,
}: {
  text: string | number;
  onClick: () => void;
  className: string;
  isDisabled?: boolean;
}) => {
  return (
    <Fab
      className={className}
      variant="extended"
      disabled={isDisabled}
      onClick={onClick}
      aria-label={text.toString()}
    >
      {text}
    </Fab>
  );
};

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

  const isPagesCountMoreThenPageNumbers = pagesCount > pageNumbers.length;
  const isPrevDotsVisible =
    isPagesCountMoreThenPageNumbers && !pageNumbers.includes(1);
  const isNextDotsVisible =
    isPagesCountMoreThenPageNumbers && !pageNumbers.includes(pagesCount);

  return (
    <Box className={classes.root}>
      <PaginationButton
        className={classes.fab}
        text={t('providers.table.pagination.previous-button')}
        onClick={() => onPageChange(pageIndex - 1)}
        isDisabled={isFirstPage}
      />

      {isPrevDotsVisible && dots}

      {pageNumbers.map((pageNumber: number) => (
        <PaginationButton
          key={uid(pageNumber)}
          className={classNames(classes.fab, {
            [classes.isActive]: pageNumber - 1 === pageIndex,
          })}
          text={pageNumber}
          onClick={() => onPageChange(pageNumber - 1)}
        />
      ))}

      {isNextDotsVisible && dots}

      <PaginationButton
        className={classes.fab}
        text={t('providers.table.pagination.next-button')}
        onClick={() => onPageChange(pageIndex + 1)}
        isDisabled={isLastPage}
      />
    </Box>
  );
};
