import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';

import { Button } from 'uiKit/Button';
import { Spinner } from 'uiKit/Spinner';

import { useHistoryStyles } from './useHistoryStyles';

interface IHistoryProps {
  isLoading?: boolean;
  isFirstLoading?: boolean;
  typeButtonsSlot?: JSX.Element;
  tokenSelectSlot?: JSX.Element;
  tableSlot?: JSX.Element;
  footerText?: string;
  onShowMoreClick?: VoidFunction;
}

export const History = ({
  isLoading = false,
  isFirstLoading = false,
  typeButtonsSlot,
  tokenSelectSlot,
  tableSlot,
  footerText,
  onShowMoreClick,
}: IHistoryProps): JSX.Element => {
  const classes = useHistoryStyles();

  const defaultFooterText = isLoading
    ? t('history-dialog.loading-date-range')
    : t('history-dialog.default-date-range');

  return (
    <div className={classes.container} data-testid="history-dialog">
      <Typography className={classes.header} variant="h3">
        {t('history-dialog.header')}
      </Typography>

      {typeButtonsSlot}

      {tokenSelectSlot}

      <div className={classes.tableWrapper}>
        {isFirstLoading ? (
          <div className={classes.empty}>
            <Spinner />
          </div>
        ) : (
          <>
            {tableSlot}

            <div className={classes.footer}>
              <Button
                className={classes.showMoreButton}
                disabled={isLoading}
                isLoading={isLoading}
                variant="outlined"
                onClick={onShowMoreClick}
              >
                {isLoading
                  ? t('history-dialog.loading-history')
                  : t('history-dialog.show-more')}
              </Button>

              <Typography className={classes.footerText} color="textSecondary">
                {footerText ?? defaultFooterText}
              </Typography>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
