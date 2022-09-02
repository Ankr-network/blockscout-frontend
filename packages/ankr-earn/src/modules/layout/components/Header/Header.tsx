import { Drawer } from '@material-ui/core';
import { ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { GlobalMenu } from '@ankr.com/global-menu';
import { useIsSMDown, useIsXLUp } from 'ui';

import { STAKING_PATH, featuresConfig } from 'modules/common/const';
import { Container } from 'uiKit/Container';

import { useLocale } from '../../../i18n/hooks/useLocale';
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
}: IHeader): JSX.Element => {
  const classes = useStyles();
  const isXLUp = useIsXLUp();
  const isMobile = useIsSMDown();
  const { locale } = useLocale();
  const history = useHistory();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [history.location.pathname]);

  return (
    <header>
      <Container className={classes.container} maxWidth="none">
        <div className={classes.leftSide}>
          <GlobalMenu isMobile={isMobile} locale={locale} project="staking" />

          <Logo className={classes.logo} href={STAKING_PATH} />
        </div>

        <div className={classes.center}>{mainNavigationSlot}</div>

        <div className={classes.rightSide}>
          {featuresConfig.localeSwitcher && isXLUp && (
            <LocaleSwitcher className={classes.localeSwitcher} />
          )}

          {!!rightComponentSlot && (
            <div className={classes.rightComponentSlot}>
              {rightComponentSlot}
            </div>
          )}

          {!isXLUp && (
            <Toggle
              className={classes.toggle}
              opened={drawerOpen}
              onClick={toggleDrawer}
            />
          )}
        </div>
      </Container>

      {!isXLUp && (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          {mainNavigationMobileSlot}
        </Drawer>
      )}

      {bannerSlot}
    </header>
  );
};
