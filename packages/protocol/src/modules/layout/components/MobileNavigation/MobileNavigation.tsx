import { Button, Container } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { MobileDetails } from 'domains/mobileDetails/screens/MobileDetails';
import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { getNavigationList } from '../MainNavigation/MainNavigationUtils';
import { isExternalPath } from 'modules/common/utils/isExternalPath';
import { useMobileNavigationStyles } from './useMobileNavigationStyles';
import { useTrackDocs } from 'modules/layout/hooks/useTrackDocs';
import { useTrackSettings } from 'modules/layout/hooks/useTrackSettings';

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

  const onDocsClick = useTrackDocs();
  const onSettingsClick = useTrackSettings();

  const items = getNavigationList({
    chainsRoutes,
    hasPremium,
    onDocsClick,
    onSettingsClick,
  });

  return (
    <>
      {!loading && (
        <nav className={cx(classes.root, classes.custom, className)}>
          <Container className={classes.container} maxWidth={false}>
            {items.map(
              ({
                ActiveIcon,
                StartIcon,
                href = '',
                isActive,
                label,
                onClick,
              }) =>
                isExternalPath(href) ? (
                  <Button
                    className={classes.link}
                    color="primary"
                    component="a"
                    href={href}
                    key={label}
                    onClick={onClick}
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="text"
                  >
                    <StartIcon />
                    {label}
                  </Button>
                ) : (
                  <Button
                    activeClassName={classes.activeLink}
                    className={classes.link}
                    color="primary"
                    component={NavLink}
                    isActive={isActive}
                    key={label}
                    onClick={onClick}
                    to={href}
                    variant="text"
                  >
                    <StartIcon />
                    {ActiveIcon && (
                      <ActiveIcon className={classes.activeLink} />
                    )}
                    {label}
                  </Button>
                ),
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
