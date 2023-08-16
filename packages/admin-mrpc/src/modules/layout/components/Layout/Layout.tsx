import React, { ReactChild } from 'react';
import { Drawer, AppBar, Toolbar, List, Container } from '@mui/material';
import { NavLink } from 'ui';
import { useAppSelector } from 'modules/../store/useAppSelector';

import { NoReactSnap } from 'uiKit/NoReactSnap';
import { Breadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { SearchClientsInput } from 'modules/clients/components/SearchClientsInput';
import { SearchEmailBindingsInput } from 'modules/clients/components/SearchEmailBindingsInput';

import { Header } from '../Header';
import { useLayoutStyles as useStyles } from './LayoutStyles';
import { HideOnScroll } from '../HideOnScrollWrapper';

const routes = [
  {
    text: 'Clients',
    link: ClientsRoutesConfig.clients.generatePath(),
  },
  {
    text: 'Something more',
    link: '/404',
  },
];

interface ILayoutProps {
  children?: ReactChild;
  hasNoReactSnap?: boolean;
  hasSecretRouteAccess?: boolean;
  hasTestDriveTokenCreationAccess?: boolean;
}

export const Layout = ({
  children,
  hasNoReactSnap = false,
  hasSecretRouteAccess = false,
  hasTestDriveTokenCreationAccess = false,
}: ILayoutProps) => {
  const { classes } = useStyles();

  const address = useAppSelector(store => store.auth.address);

  return (
    <div className={classes.wrapper}>
      <HideOnScroll>
        <AppBar elevation={0} position="fixed" className={classes.appBar}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Header
                address={address}
                hasSecretRouteAccess={hasSecretRouteAccess}
                hasTestDriveTokenCreationAccess={
                  hasTestDriveTokenCreationAccess
                }
              />
            </Toolbar>
            <Toolbar disableGutters>
              {address && <SearchClientsInput />}
              {address && <SearchEmailBindingsInput filterType="email" />}
              {address && <SearchEmailBindingsInput filterType="address" />}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {routes.map(({ text, link }) => (
            <NavLink
              className={classes.navLink}
              activeClassName={classes.navLinkActive}
              variant="outlined"
              key={text}
              href={link}
            >
              {text}
            </NavLink>
          ))}
        </List>
      </Drawer>

      <Container maxWidth="xl">
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Breadcrumbs />
          {hasNoReactSnap ? <NoReactSnap>{children}</NoReactSnap> : children}
        </main>
      </Container>
    </div>
  );
};
