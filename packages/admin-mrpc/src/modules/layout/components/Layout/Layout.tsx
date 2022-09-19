import React, { JSXElementConstructor, ReactElement } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { NavLink } from 'ui';
import { Header } from '../Header';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      position: 'static',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      alignItems: 'flex-end',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#1F2226',
    },
    navLink: {
      width: '100%',
      justifyContent: 'flex-start',
      border: 'none',
      borderRadius: 0,
      color: 'white',
      fontWeight: 600,
      textTransform: 'none',
      fontSize: 16,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
    navLinkActive: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3),
      minHeight: '100vh',
    },
  }),
);

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
