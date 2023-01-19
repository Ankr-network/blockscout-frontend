import { useMemo, ReactChild } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';

import { getTheme } from 'modules/common/utils/getTheme';
import { Themes } from '@ankr.com/ui';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { usePublicChainsRoutes } from 'domains/chains/hooks/usePublicChainsRoutes';
import { Header } from '../Header';
import { MobileHeader } from '../MobileHeader';
import { MobileNavigation } from '../MobileNavigation';
import { SideBar } from '../SideBar';
import { useStyles } from './DefaultLayoutStyles';
import { Breadcrumbs } from '../Breadcrumbs';

export interface ILayoutProps {
  children?: ReactChild;
  theme?: Themes;
  disableGutters?: boolean;
  hasNoReactSnap?: boolean;
  hasError?: boolean;
  hasGradient?: boolean;
  hasMaxWidth?: boolean;
  isHeaderTransparent?: boolean;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
  disableGutters = false,
  hasNoReactSnap = false,
  hasError = false,
  hasGradient = false,
  hasMaxWidth = true,
  isHeaderTransparent,
}: ILayoutProps) => {
  const { classes, cx } = useStyles({
    hasGradient: hasGradient || hasError,
    hasPaddingBottom: hasMaxWidth,
    isHeaderTransparent,
  });
  const { hasPremium, loading } = useAuth();
  const chainsRoutes = usePublicChainsRoutes();

  const isDarkTheme = theme === Themes.dark;
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <div className={cx(classes.root, isDarkTheme && classes.darkTheme)}>
      <ThemeProvider theme={currentTheme}>
        <SideBar
          className={classes.sidebar}
          loading={loading}
          hasPremium={hasPremium}
          chainsRoutes={chainsRoutes}
        />
        <div className={classes.body}>
          {!hasError && <Header className={classes.header} />}
          <MobileHeader className={classes.mobileHeader} />
          <Container
            disableGutters={disableGutters}
            className={classes.main}
            maxWidth={hasMaxWidth && false}
          >
            <Container
              disableGutters={!disableGutters}
              className={classes.mobileBreadcrumbs}
            >
              <Breadcrumbs />
            </Container>
            {hasNoReactSnap ? <NoReactSnap>{children}</NoReactSnap> : children}
          </Container>
        </div>
        <MobileNavigation
          loading={loading}
          hasPremium={hasPremium}
          chainsRoutes={chainsRoutes}
        />
      </ThemeProvider>
    </div>
  );
};
