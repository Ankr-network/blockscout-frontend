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
  imgUrl?: string;
  className?: string;
}

export const InfoCard = ({
  title,
  description,
  children,
  align,
  titleClassName,
  descriptionClassName,
  imgUrl,
  className,
}: IInfoCardProps) => {
  const { classes, cx } = useStyles(align);

  return (
    <Paper className={cx(classes.paper, className)}>
      {imgUrl && <img alt="" className={classes.image} src={imgUrl} />}
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
