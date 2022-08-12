import { Chip, Tab as MuiTab, TabProps, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useTabsStyles } from './useTabsStyles';

interface ITabProps extends Omit<TabProps, 'className' | 'classes' | 'label'> {
  title: string;
  value: string;
  activeTab: string;
  amount?: number;
}

export const Tab = ({
  title,
  value,
  activeTab,
  amount,
  ...restProps
}: ITabProps): JSX.Element => {
  const classes = useTabsStyles();

  return (
    <MuiTab
      {...restProps}
      classes={{ root: classes.tabArea, selected: classes.tabSelected }}
      className={classes.tabArea}
      label={
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
      }
      value={value}
    />
  );
};
