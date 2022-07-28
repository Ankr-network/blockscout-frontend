import { Paper, Typography } from '@material-ui/core';
import { ReactNode } from 'react';
import { useStyles } from './ContainerCardStyles';

interface IContainerCardProps {
  title: string;
  children: ReactNode;
}

export const ContainerCard = ({ title, children }: IContainerCardProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title}>{title}</Typography>

      {children}
    </Paper>
  );
};
