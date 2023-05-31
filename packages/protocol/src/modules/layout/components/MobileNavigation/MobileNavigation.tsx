import { useMemo } from 'react';
import { Button, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useIsMDDown } from 'uiKit/Theme/useTheme';
import {
  getCommonMenuList,
  getNavigationList,
} from '../MainNavigation/utils/navigationUtils';
import { isExternalPath } from 'modules/common/utils/isExternalPath';
import { useMobileNavigationStyles } from './useMobileNavigationStyles';
import { useTrackAAPI } from 'modules/layout/hooks/useTrackAAPI';
import { useTrackDashboard } from 'modules/layout/hooks/useTrackDashboard';
import { useTrackDocs } from 'modules/layout/hooks/useTrackDocs';
import { useTrackSettings } from 'modules/layout/hooks/useTrackSettings';
import { IS_DASHBOARD_HIDDEN_ON_MOBILE } from 'domains/dashboard/screens/Dashboard/const';

interface MobileHeaderProps {
  chainsRoutes: string[];
  className?: string;
  isLoggedIn: boolean;
  hasPremium: boolean;
  loading: boolean;
}

export const MobileNavigation = ({
  chainsRoutes,
  className = '',
  isLoggedIn,
  hasPremium,
  loading,
}: MobileHeaderProps) => {
  const { classes, cx } = useMobileNavigationStyles();

  const onAAPIClick = useTrackAAPI();
  const onDashboardClick = useTrackDashboard();
  const onDocsClick = useTrackDocs();
  const onSettingsClick = useTrackSettings();

  const commonItem = getCommonMenuList(onDashboardClick);

  const items = getNavigationList({
    chainsRoutes,
    isLoggedIn,
    onAAPIClick,
    onDocsClick,
    onSettingsClick,
  });

  const isDashboardHidden = Boolean(
    useIsMDDown() && IS_DASHBOARD_HIDDEN_ON_MOBILE,
  );

  const mobileItems = useMemo(() => {
    if (hasPremium && !isDashboardHidden) {
      return commonItem.concat(items);
    }

    return items;
  }, [hasPremium, commonItem, items, isDashboardHidden]);

  return (
    <>
      {!loading && (
        <nav className={cx(classes.root, classes.custom, className)}>
          <Container className={classes.container} maxWidth={false}>
            {mobileItems.map(
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
