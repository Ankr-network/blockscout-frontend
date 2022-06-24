import classNames from 'classnames';

import { useEmptyStateStyles } from './useEmptyStateStyles';

export interface IDescriptionItemProps {
  iconSlot: JSX.Element;
  description: string;
}

export const DescriptionItem = ({
  iconSlot,
  description,
}: IDescriptionItemProps): JSX.Element => {
  const classes = useEmptyStateStyles();

  return (
    <div className={classes.statistic}>
      {iconSlot}

      <div className={classNames(classes.wrapper, classes.desciptionItem)}>
        {description}
      </div>
    </div>
  );
};
