import { useStyles } from './SocialsStyles';
import { Button } from '@material-ui/core';

export interface ISocialItem {
  className?: string;
  title: string;
  icon: any;
  href: string;
}

export const SocialItem = ({
  className = '',
  title,
  icon,
  href,
}: ISocialItem) => {
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
