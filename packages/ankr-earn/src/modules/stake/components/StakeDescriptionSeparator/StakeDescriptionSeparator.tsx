import { Box, BoxProps } from '@material-ui/core';
import classNames from 'classnames';

import { useStakeDescriptionSeparatorStyles } from './useStakeDescriptionSeparatorStyles';

export const StakeDescriptionSeparator = ({
  className,
  ...restProps
}: BoxProps): JSX.Element => {
  const classes = useStakeDescriptionSeparatorStyles();

  return (
    <Box
      component="div"
      {...restProps}
      className={classNames(className, classes.root)}
    />
  );
};
