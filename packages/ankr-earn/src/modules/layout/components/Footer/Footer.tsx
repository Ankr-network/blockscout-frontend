import { SubNavigation } from '../SubNavigation';
import { Rights } from '../Rights';
import { Socials } from '../Socials';
import { useStyles } from './FooterStyles';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = '' }: FooterProps) => {
  const classes = useStyles();

  return (
    <footer className={classes.container}>
      <div className={classes.leftSide}>
        <Rights />
      </div>
      <div className={classes.center}>
        <SubNavigation />
      </div>
      <div className={classes.rightSide}>
        <Socials />
      </div>
    </footer>
  );
};
