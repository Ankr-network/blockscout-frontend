import { MainNavigation } from '../MainNavigation';
import { Logo } from '../Logo';
import { useStyles } from './HeaderStyles';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
  const classes = useStyles();

  return (
    <header className={classes.container}>
      <div className={classes.leftSide}>
        <Logo />
      </div>
      <div className={classes.center}>
        <MainNavigation />
      </div>
      <div className={classes.rightSide}></div>
    </header>
  );
};
