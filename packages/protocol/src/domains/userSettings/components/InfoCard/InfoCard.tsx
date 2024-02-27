import { ReactNode } from 'react';
import { Paper, Typography } from '@mui/material';

import { CheckMarkImage } from 'modules/common/components/CheckMarkImage';

import { Align } from './types';
import { useStyles } from './InfoCardStyles';

interface IInfoCardProps {
  align: Align;
  children?: ReactNode;
  className?: string;
  description: ReactNode;
  descriptionClassName?: string;
  hasImage?: boolean;
  title: string;
  titleClassName?: string;
}

export const InfoCard = ({
  align,
  children,
  className,
  description,
  descriptionClassName,
  hasImage = false,
  title,
  titleClassName,
}: IInfoCardProps) => {
  const { classes, cx } = useStyles(align);

  return (
    <Paper className={cx(classes.paper, className)}>
      {hasImage && <CheckMarkImage className={classes.image} />}
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
