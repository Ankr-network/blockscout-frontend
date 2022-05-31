import { Button } from '@material-ui/core';
import { ReactNode } from 'react';

import { useSocialsStyles as useStyles } from './useSocialsStyles';

export interface ISocialItem {
  title: string;
  icon: ReactNode;
  href: string;
}

export const SocialItem = ({ title, icon, href }: ISocialItem): JSX.Element => {
  const classes = useStyles();

  return (
    <Button
      key={title}
      className={classes.link}
      component="a"
      data-testid={title}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      variant="text"
    >
      {icon}
    </Button>
  );
};
