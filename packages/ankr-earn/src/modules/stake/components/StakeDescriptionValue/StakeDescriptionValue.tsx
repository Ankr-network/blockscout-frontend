import { Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import {
  IUseStakeDescriptionValueStylesProps,
  useStakeDescriptionValueStyles,
} from './StakeDescriptionValueStyles';

export interface IStakeDescriptionValueProps
  extends IUseStakeDescriptionValueStylesProps {
  children: ReactNode;
}

export const StakeDescriptionValue = ({
  children,
  isBold = true,
}: IStakeDescriptionValueProps): JSX.Element => {
  const classes = useStakeDescriptionValueStyles({ isBold });

  return (
    <Typography classes={{ root: classes.root }} component="div" variant="h5">
      {children}
    </Typography>
  );
};
