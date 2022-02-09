import { Drawer } from '@material-ui/core';
import { EARN_PATH, featuresConfig } from 'modules/common/const';
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
  bannerSlot?: ReactNode;
}

export const Header = ({
  mainNavigationMobileSlot,
  mainNavigationSlot,
  rightComponentSlot,
  bannerSlot,
}: IHeader) => {
  const classes = useStyles();
  const isLGUp = useIsLGUp();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header>
      {bannerSlot}

      <Container className={classes.container} maxWidth="none">
        <div className={classes.leftSide}>
          <Logo className={classes.logo} href={EARN_PATH} />
        </div>

        <div className={classes.center}>{mainNavigationSlot}</div>

        <div className={classes.rightSide}>
          {featuresConfig.localeSwitcher && isLGUp && (
            <LocaleSwitcher className={classes.localeSwitcher} />
          )}

          {!!rightComponentSlot && (
            <div className={classes.rightComponentSlot}>
              {rightComponentSlot}
            </div>
          )}

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
