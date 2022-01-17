import {
  AppBar,
  Button,
  Container,
  Drawer,
  Slide,
  useScrollTrigger,
} from '@material-ui/core';
import React, { ReactElement, ReactNode, useState } from 'react';
import { useIsLGUp } from 'ui';
import { Toggle } from './Toggle';
import { useHeaderStyles as useStyles } from './useHeaderStyles';
import { t } from '../../../i18n/utils/intl';
import { HomeLogo } from '../HomeLogo/HomeLogo';

function HideOnScroll({ children }: { children: ReactElement }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

interface IHeader {
  mainNavigationMobileSlot: ReactNode;
  mainNavigationSlot: ReactNode;
}

export const Header = ({
  mainNavigationMobileSlot,
  mainNavigationSlot,
}: IHeader) => {
  const classes = useStyles();
  const isLGUp = useIsLGUp();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <HideOnScroll>
      <AppBar elevation={0} component="header" className={classes.root}>
        <Container className={classes.container}>
          <div className={classes.leftSide}>
            <HomeLogo className={classes.logo} />
          </div>

          <div className={classes.center}>{mainNavigationSlot}</div>

          <div className={classes.rightSide}>
            {isLGUp && (
              <Button variant="text" color="primary" disableElevation={false}>
                {t('header.wallet-button')}
              </Button>
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
      </AppBar>
    </HideOnScroll>
  );
};
