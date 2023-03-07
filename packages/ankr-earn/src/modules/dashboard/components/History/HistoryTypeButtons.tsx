import { t } from '@ankr.com/common';
import classNames from 'classnames';

import { Button } from 'uiKit/Button';

import { useHistoryStyles } from './useHistoryStyles';

interface IHistoryTypeButtonsProps {
  isStakedActive?: boolean;
  isUnstakedActive?: boolean;
  onStakedClick?: VoidFunction;
  onUnstakedClick?: VoidFunction;
}

export const HistoryTypeButtons = ({
  isStakedActive = false,
  isUnstakedActive = false,
  onStakedClick,
  onUnstakedClick,
}: IHistoryTypeButtonsProps): JSX.Element => {
  const classes = useHistoryStyles();

  return (
    <div className={classes.transactionTypeWrapper}>
      <div className={classes.transactionType}>
        <Button
          className={classNames(
            classes.typeButton,
            isStakedActive && classes.typeButtonActive,
          )}
          onClick={onStakedClick}
        >
          {t('history-dialog.staking')}
        </Button>

        <Button
          className={classNames(
            classes.typeButton,
            isUnstakedActive && classes.typeButtonActive,
          )}
          onClick={onUnstakedClick}
        >
          {t('history-dialog.unstaking')}
        </Button>
      </div>
    </div>
  );
};
