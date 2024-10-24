import { FilterNewActiveIcon, FilterNewIcon } from '@ankr.com/ui';

import { useFilterButtonStyles } from './useFilterButtonStyles';

interface IFilterButtonProps {
  isActive: boolean;
  handleClick: () => void;
}

export const FilterButton = ({ handleClick, isActive }: IFilterButtonProps) => {
  const { classes } = useFilterButtonStyles();

  if (isActive)
    return (
      <FilterNewActiveIcon className={classes.root} onClick={handleClick} />
    );

  return <FilterNewIcon className={classes.root} onClick={handleClick} />;
};
