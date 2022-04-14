import { Drawer } from '@material-ui/core';
import { ReactNode, useState } from 'react';

import { GlobalMenu } from '@ankr.com/global-menu';
import { useIsLGUp, useIsSMDown } from 'ui';

import { EARN_PATH, featuresConfig } from 'modules/common/const';
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
  const isLGUp = useIsLGUp();
  const isMobile = useIsSMDown();
  const { locale } = useLocale();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header>
      {bannerSlot}

      <Container className={classes.container} maxWidth="none">
        <div className={classes.leftSide}>
          <GlobalMenu
            isMobile={isMobile}
            locale={locale}
            project="earn"
          />

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
              opened={drawerOpen}
              onClick={toggleDrawer}
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
