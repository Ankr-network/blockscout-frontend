import React, { useEffect, useState } from 'react';
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
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { MobileDetails } from 'domains/mobileDetails/screens/MobileDetails';
import { useMobileNavigationStyles } from './useMobileNavigationStyles';
import { useIsSMDown } from 'modules/themes/useTheme';

interface MobileHeaderProps {
  className?: string;
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
    () => [
      {
        label: t('mobile-navigation.public-rpcs'),
        StartIcon: BoxIcon,
        href: ChainsRoutesConfig.chains.generatePath(),
      },
      {
        label: t('mobile-navigation.plan'),
        StartIcon: DiamondIcon,
        href: PlanRoutesConfig.plan.generatePath(),
      },
      {
        label: t('mobile-navigation.protocol'),
        StartIcon: PaperIcon,
        href: ProvidersRoutesConfig.providers.generatePath(),
      },
      {
        label: t('mobile-navigation.more'),
        StartIcon: MoreIcon,
        onClick: () => setIsOpened(oldIsOpened => !oldIsOpened),
      },
    ],
    [],
  );

  return (
    <nav className={classNames(classes.root, classes.custom, className)}>
      <Container className={classes.container} maxWidth={false}>
        {items.map(({ label, href = '', onClick, StartIcon }) => {
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
