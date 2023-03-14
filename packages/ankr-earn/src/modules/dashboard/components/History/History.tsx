import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';

import { Spinner } from 'uiKit/Spinner';

import { useHistoryStyles } from './useHistoryStyles';

interface IHistoryProps {
  isFirstLoading?: boolean;
  footerSlot?: JSX.Element;
  typeButtonsSlot?: JSX.Element;
  tokenSelectSlot?: JSX.Element;
  tableSlot?: JSX.Element;
}

export const History = ({
  isFirstLoading = false,
  footerSlot,
  typeButtonsSlot,
  tokenSelectSlot,
  tableSlot,
}: IHistoryProps): JSX.Element => {
  const classes = useHistoryStyles();

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

            {footerSlot}
          </>
        )}
      </div>
    </div>
  );
};
