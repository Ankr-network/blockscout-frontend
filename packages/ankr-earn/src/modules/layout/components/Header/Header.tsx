import { Drawer } from '@material-ui/core';
import { ReactNode, useState } from 'react';
import { useIsLGUp } from 'ui';
import { Container } from 'uiKit/Container';
import { LocaleSwitcher } from '../LocaleSwitcher';
import { Logo } from '../Logo';
import { Toggle } from '../Toggle';
import { useHeaderStyles as useStyles } from './useHeaderStyles';

interface IHeader {
  mainNavigationMobileSlot: ReactNode;
  mainNavigationSlot: ReactNode;
  rightComponentSlot?: ReactNode;
}

export const Header = ({
  mainNavigationMobileSlot,
  mainNavigationSlot,
  rightComponentSlot,
}: IHeader) => {
  const classes = useStyles();
  const isLGUp = useIsLGUp();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header>
      <Container className={classes.container} maxWidth="none">
        <div className={classes.leftSide}>
          <Logo className={classes.logo} />
        </div>

        <div className={classes.center}>{mainNavigationSlot}</div>

        <div className={classes.rightSide}>
          {isLGUp && <LocaleSwitcher className={classes.localeSwitcher} />}

          {!!rightComponentSlot && rightComponentSlot}

          {!isLGUp && (
            <Toggle
              className={classes.toggle}
              onClick={toggleDrawer}
              opened={drawerOpen}
            />
          )}
        </div>
      </Container>

      {!isLGUp && (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          {mainNavigationMobileSlot}
        </Drawer>
      )}
    </header>
  );
};
