import React, { JSXElementConstructor, ReactElement } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { NavLink } from 'ui';
import { Header } from '../Header';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
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

export default function Layout({
  children,
}: {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Header />
        </Toolbar>
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
