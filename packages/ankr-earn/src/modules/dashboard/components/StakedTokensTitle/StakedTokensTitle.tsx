import { Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import { useStakedTokensTitleStyles } from './useStakedTokensTitleStyles';

interface IStakedTokensTitleProps {
  children: ReactNode;
}

export const StakedTokensTitle = ({
  children,
}: IStakedTokensTitleProps): JSX.Element => {
  const classes = useStakedTokensTitleStyles();

  return (
    <Typography className={classes.title} variant="h3">
      {children}
    </Typography>
  );
};
