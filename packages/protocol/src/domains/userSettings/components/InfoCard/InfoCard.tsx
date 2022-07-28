import { Paper, Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import { useStyles } from './InfoCardStyles';
import { Align } from './types';

interface IInfoCardProps {
  title: string;
  description: ReactNode;
  actionSlot?: ReactNode;
  align: Align;
}

export const InfoCard = ({
  title,
  description,
  actionSlot,
  align,
}: IInfoCardProps) => {
  const classes = useStyles({ align });

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>

      <Typography className={classes.description}>{description}</Typography>

      {actionSlot}
    </Paper>
  );
};
