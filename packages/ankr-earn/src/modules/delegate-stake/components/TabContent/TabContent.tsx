import { Typography, Chip } from '@material-ui/core';
import classNames from 'classnames';

import { useTabContentStyles } from './useTabContentStyles';

interface ITabProps {
  title: string;
  value: string;
  activeTab: string;
  amount?: number;
}

export const TabContent = ({
  title,
  value,
  activeTab,
  amount,
}: ITabProps): JSX.Element => {
  const classes = useTabContentStyles();

  return (
    <div className={classes.itemWrapper}>
      <Typography
        className={classNames(classes.tabText, {
          [classes.tabActive]: activeTab === value,
        })}
        color={activeTab === value ? 'textPrimary' : 'textSecondary'}
        variant="h3"
      >
        {title}
      </Typography>

      {!!amount && (
        <Chip
          classes={{ label: classes.chipLabel }}
          className={classes.chip}
          color="primary"
          label={amount}
          size="small"
        />
      )}
    </div>
  );
};
