import React, { ReactChild } from 'react';
import { Drawer, AppBar, Toolbar, List, Container } from '@mui/material';
import { NavLink } from 'ui';
import { Breadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { Header } from '../Header';
import { useLayoutStyles as useStyles } from './LayoutStyles';

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
}

export const Layout = ({ children, hasNoReactSnap = false }: ILayoutProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar elevation={0} position="fixed" className={classes.appBar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Header />
          </Toolbar>
        </Container>
      </AppBar>

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
