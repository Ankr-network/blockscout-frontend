import { Container, Drawer } from '@material-ui/core';
import { ReactNode, useState } from 'react';
import { useIsLGUp } from '../../../themes/useTheme';
import { LocaleSwitcher } from '../LocaleSwitcher';
import { Logo } from '../Logo';
import { MainNavigation } from '../MainNavigation';
import { Toggle } from '../Toggle';
import { useHeaderStyles as useStyles } from './useHeaderStyles';

interface IHeader {
  navigationSlot: ReactNode;
}

export const Header = ({ navigationSlot }: IHeader) => {
  const classes = useStyles();

  const isLGUp = useIsLGUp();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header>
      <Container className={classes.container}>
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
      </Container>
      {!isLGUp && (
        <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer()}>
          {navigationSlot}
        </Drawer>
      )}
    </header>
  );
};
