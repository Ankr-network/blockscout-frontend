import { Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useStyles } from './ContainerCardStyles';

interface IContainerCardProps {
  title: string;
  children: ReactNode;
}

export const ContainerCard = ({ title, children }: IContainerCardProps) => {
  const { classes } = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography component="p" className={classes.title}>
        {title}
      </Typography>

      {children}
    </Paper>
  );
};
