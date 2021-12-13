import { useStyles } from './useSocialsStyles';
import { Button } from '@material-ui/core';
import { FC } from 'react';

export interface ISocialItem {
  className?: string;
  title: string;
  icon: any;
  href: string;
}

export const SocialItem: FC<ISocialItem> = ({
  className = '',
  title,
  icon,
  href,
}) => {
  const classes = useStyles();

  return (
    <Button
      key={title}
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="text"
      className={classes.link}
    >
      {icon}
    </Button>
  );
};
