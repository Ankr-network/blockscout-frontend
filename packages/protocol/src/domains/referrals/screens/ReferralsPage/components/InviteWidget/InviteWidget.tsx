import { ReactNode } from 'react';
import { Typography } from '@mui/material';

import { Widget } from '../Widget';
import { useInviteWidgetStyles } from './useInviteWidgetStyles';

export interface IInviteWidgetProps {
  button?: ReactNode;
  className?: string;
  description: string;
  image: string;
  title: string;
}

export const InviteWidget = ({
  button,
  className,
  description,
  image,
  title,
}: IInviteWidgetProps) => {
  const { classes, cx } = useInviteWidgetStyles();

  return (
    <Widget className={cx(classes.root, className)}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="subtitle1">
          {title}
        </Typography>
        <Typography
          component="div"
          className={classes.description}
          variant="body2"
        >
          {description}
        </Typography>
      </div>
      <div className={classes.footer}>
        <div className={classes.button}>{button}</div>
        <img className={classes.image} alt={image} src={image} />
      </div>
    </Widget>
  );
};
