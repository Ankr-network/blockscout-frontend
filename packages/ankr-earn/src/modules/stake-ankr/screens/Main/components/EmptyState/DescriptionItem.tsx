import { Chip } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'common';

import { useEmptyStateStyles } from './useEmptyStateStyles';

export interface IDescriptionItemProps {
  iconSlot: JSX.Element;
  description: string;
  isComingSoon?: boolean;
}

export const DescriptionItem = ({
  iconSlot,
  description,
  isComingSoon = false,
}: IDescriptionItemProps): JSX.Element => {
  const classes = useEmptyStateStyles();

  return (
    <div className={classes.statistic}>
      {iconSlot}

      <div className={classNames(classes.wrapper, classes.desciptionItem)}>
        {description}
      </div>

      {isComingSoon && (
        <Chip
          disabled
          className={classes.chip}
          label={t('features.chips.coming-soon')}
          size="small"
        />
      )}
    </div>
  );
};
