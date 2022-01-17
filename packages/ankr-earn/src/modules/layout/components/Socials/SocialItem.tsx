import { Button } from '@material-ui/core';
import { useSocialsStyles as useStyles } from './useSocialsStyles';

export interface ISocialItem {
  title: string;
  icon: any;
  href: string;
}

export const SocialItem = ({ title, icon, href }: ISocialItem) => {
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
