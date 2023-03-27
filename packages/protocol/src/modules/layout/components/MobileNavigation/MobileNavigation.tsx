import { Button, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { getNavigationList } from '../MainNavigation/utils/navigationUtils';
import { isExternalPath } from 'modules/common/utils/isExternalPath';
import { useMobileNavigationStyles } from './useMobileNavigationStyles';
import { useTrackAAPI } from 'modules/layout/hooks/useTrackAAPI';
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
  const { classes, cx } = useMobileNavigationStyles();

  const onAAPIClick = useTrackAAPI();
  const onDocsClick = useTrackDocs();
  const onSettingsClick = useTrackSettings();

  const items = getNavigationList({
    chainsRoutes,
    hasPremium,
    onAAPIClick,
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
          </Container>
        </nav>
      )}
    </>
  );
};
