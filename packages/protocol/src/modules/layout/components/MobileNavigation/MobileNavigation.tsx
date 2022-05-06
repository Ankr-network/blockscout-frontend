import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Container } from '@material-ui/core';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as DiamondIcon } from 'uiKit/Icons/diamond.svg';
import { ReactComponent as BoxIcon } from 'uiKit/Icons/box.svg';
import { ReactComponent as MoreIcon } from 'uiKit/Icons/more.svg';
import { ReactComponent as PaperIcon } from 'uiKit/Icons/paper.svg';

import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { ProvidersRoutesConfig } from 'domains/nodeProviders/Routes';
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
}

interface IMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  StartIcon: FunctionComponent;
  isActive: IsActive;
}

export const MobileNavigation = ({ className = '' }: MobileHeaderProps) => {
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
          label: t('mobile-navigation.dashboard'),
          StartIcon: BoxIcon,
          href: ChainsRoutesConfig.chains.generatePath(),
          isActive: isDashboardActive,
        },
        {
          label: t('mobile-navigation.account-details'),
          StartIcon: DiamondIcon,
          href: AccountRoutesConfig.accountDetails.generatePath(),
        },
        {
          label: t('mobile-navigation.protocol'),
          StartIcon: PaperIcon,
          href: ProvidersRoutesConfig.providers.generatePath(),
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
    [],
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
