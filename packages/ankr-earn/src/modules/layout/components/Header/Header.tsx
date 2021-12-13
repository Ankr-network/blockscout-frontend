import { MainNavigation } from '../MainNavigation';
import { MainNavigationMobile } from '../MainNavigationMobile';
import { Logo } from '../Logo';
import { useStyles } from './useHeaderStyles';
import { useIsLGUp } from '../../../themes/useTheme';
import { Toggle } from '../Toggle';
import { FC, useState } from 'react';
import { Drawer } from '@material-ui/core';
import { LocaleSwitcher } from '../LocaleSwitcher';

interface IHeader {
  className?: string;
}

export const Header: FC<IHeader> = ({ className = '' }) => {
  const classes = useStyles();

  const isLGUp = useIsLGUp();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header className={classes.container}>
      <div className={classes.leftSide}>
        <Logo className={classes.logo} />
      </div>
      <div className={classes.center}>
        <MainNavigation />
      </div>
      <div className={classes.rightSide}>
        {isLGUp && <LocaleSwitcher className={classes.localeSwitcher} />}
        {!isLGUp && (
          <Toggle
            className={classes.toggle}
            onClick={() => {
              toggleDrawer();
            }}
            opened={drawerOpen}
          />
        )}
      </div>
      {!isLGUp && (
        <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer()}>
          <MainNavigationMobile></MainNavigationMobile>
        </Drawer>
      )}
    </header>
  );
};
