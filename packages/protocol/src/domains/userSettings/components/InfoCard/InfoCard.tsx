import { ReactNode } from 'react';
import { Paper, Typography } from '@mui/material';

import { useStyles } from './InfoCardStyles';
import { Align } from './types';

interface IInfoCardProps {
  title: string;
  description: ReactNode;
  children?: ReactNode;
  align: Align;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const InfoCard = ({
  title,
  description,
  children,
  align,
  titleClassName,
  descriptionClassName,
}: IInfoCardProps) => {
  const { classes, cx } = useStyles(align);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={cx(classes.title, titleClassName)}>
        {title}
      </Typography>

      <Typography className={cx(classes.description, descriptionClassName)}>
        {description}
      </Typography>

      {children}
    </Paper>
  );
};
