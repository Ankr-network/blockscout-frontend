import React, { useEffect, useState } from 'react';
import { Button, Container } from '@material-ui/core';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { MobileDetails } from 'domains/mobileDetails/screens/MobileDetails';
import { useMobileNavigationStyles } from './useMobileNavigationStyles';
import { useIsSMDown } from 'ui';
import { getNavigationList } from '../MainNavigation/MainNavigationUtils';
import { NavigationItem } from 'modules/common/components/Navigation';
import { isExternalPath } from 'modules/common/utils/isExternalPath';

interface MobileHeaderProps {
  className?: string;
  loading: boolean;
  isWalletConnected: boolean;
  hasCredentials: boolean;
  chainsRoutes: string[];
}

export const MobileNavigation = ({
  className = '',
  loading,
  isWalletConnected,
  hasCredentials,
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

  const classes = useMobileNavigationStyles();

  const items: NavigationItem[] = getNavigationList(
    isWalletConnected,
    chainsRoutes,
    hasCredentials,
    true,
  );

  return (
    <>
      {!loading && (
        <nav className={classNames(classes.root, classes.custom, className)}>
          <Container className={classes.container} maxWidth={false}>
            {items.map(({ label, href = '', StartIcon, isActive }) => {
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
