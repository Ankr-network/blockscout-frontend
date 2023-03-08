import { t } from '@ankr.com/common';
import Typography from '@material-ui/core/Typography';

import { Button } from 'uiKit/Button';

import { useHistoryStyles } from './useHistoryStyles';

interface IHistoryFooterProps {
  isLoading?: boolean;
  footerText: string;
  onShowMoreClick?: VoidFunction;
}

export const HistoryFooter = ({
  isLoading = false,
  footerText,
  onShowMoreClick,
}: IHistoryFooterProps): JSX.Element => {
  const classes = useHistoryStyles();

  return (
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
        {footerText}
      </Typography>
    </div>
  );
};
