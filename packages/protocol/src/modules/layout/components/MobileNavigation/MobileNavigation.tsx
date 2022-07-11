import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Container } from '@material-ui/core';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as DiamondIcon } from 'uiKit/Icons/diamond.svg';
import { ReactComponent as BoxIcon } from 'uiKit/Icons/box.svg';
import { ReactComponent as MoreIcon } from 'uiKit/Icons/more.svg';

import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { MobileDetails } from 'domains/mobileDetails/screens/MobileDetails';
import { useMobileNavigationStyles } from './useMobileNavigationStyles';
import { useIsSMDown } from 'ui';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { ExplorerRoutesConfig } from 'domains/explorer/Routes';
import { HAS_REQUEST_EXPLORER } from '../MainNavigation';
import {
  IsActive,
  isDashboardActive,
} from '../MainNavigation/MainNavigationUtils';

interface MobileHeaderProps {
  className?: string;
  isWalletConnected: boolean;
}

interface IMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  StartIcon: FunctionComponent;
  isActive: IsActive;
}

export const MobileNavigation = ({
  isWalletConnected,
  className = '',
}: MobileHeaderProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const isMobile = useIsSMDown();

  useEffect(() => {
    if (!isMobile) {
      setIsOpened(false);
    }
  }, [isMobile]);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpened(false);
  }, [pathname]);

  const classes = useMobileNavigationStyles();

  const items = useLocaleMemo(
    () =>
      [
        {
          label: isWalletConnected
            ? t('mobile-navigation.dashboard')
            : t('mobile-navigation.public-rpcs'),
          StartIcon: BoxIcon,
          href: ChainsRoutesConfig.chains.generatePath(),
          isActive: isDashboardActive,
        },
        {
          label: isWalletConnected
            ? t('mobile-navigation.account-details')
            : t('mobile-navigation.plan'),
          StartIcon: DiamondIcon,
          href: AccountRoutesConfig.accountDetails.generatePath(),
        },
        HAS_REQUEST_EXPLORER && {
          label: t('mobile-navigation.request-explorer'),
          StartIcon: BoxIcon,
          href: ExplorerRoutesConfig.requestExplorer.generatePath(),
        },
        {
          label: t('mobile-navigation.more'),
          StartIcon: MoreIcon,
          onClick: () => setIsOpened(oldIsOpened => !oldIsOpened),
        },
      ].filter(Boolean) as IMenuItem[],
    [isWalletConnected],
  );

  return (
    <nav className={classNames(classes.root, classes.custom, className)}>
      <Container className={classes.container} maxWidth={false}>
        {items.map(({ label, href = '', onClick, StartIcon, isActive }) => {
          return typeof onClick === 'function' ? (
            <Button
              key={label}
              variant="text"
              className={classes.link}
              color="primary"
              onClick={onClick}
              classes={{
                label: classes.label,
              }}
            >
              <StartIcon />
              {label}
            </Button>
          ) : (
            <Button
              key={label}
              component={NavLink}
              to={href}
              activeClassName={classes.activeLink}
              variant="text"
              className={classes.link}
              color="primary"
              classes={{
                label: classes.label,
              }}
              isActive={isActive}
            >
              <StartIcon />
              {label}
            </Button>
          );
        })}
        <MobileDetails isOpened={isOpened} onClose={() => setIsOpened(false)} />
      </Container>
    </nav>
  );
};
