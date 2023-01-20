import React, { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import { MobileDetails } from 'domains/mobileDetails/screens/MobileDetails';
import { useMobileNavigationStyles } from './useMobileNavigationStyles';
import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { getNavigationList } from '../MainNavigation/MainNavigationUtils';
import { NavigationItem } from 'modules/common/components/Navigation';
import { isExternalPath } from 'modules/common/utils/isExternalPath';

interface MobileHeaderProps {
  className?: string;
  loading: boolean;
  hasPremium: boolean;
  chainsRoutes: string[];
}

export const MobileNavigation = ({
  className = '',
  loading,
  hasPremium,
  chainsRoutes,
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

  const { classes, cx } = useMobileNavigationStyles();

  const items: NavigationItem[] = getNavigationList(chainsRoutes, hasPremium);

  return (
    <>
      {!loading && (
        <nav className={cx(classes.root, classes.custom, className)}>
          <Container className={classes.container} maxWidth={false}>
            {items.map(
              ({ label, href = '', StartIcon, ActiveIcon, isActive }) => {
                return isExternalPath(href) ? (
                  <Button
                    key={label}
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="text"
                    className={classes.link}
                    color="primary"
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
                    isActive={isActive}
                  >
                    <StartIcon />
                    {ActiveIcon && (
                      <ActiveIcon className={classes.activeLink} />
                    )}
                    {label}
                  </Button>
                );
              },
            )}
            <MobileDetails
              isOpened={isOpened}
              onClose={() => setIsOpened(false)}
            />
          </Container>
        </nav>
      )}
    </>
  );
};
