import React, { ReactChild, useMemo } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import { NavLink, Themes } from 'ui';
import { getTheme } from 'modules/common/utils/getTheme';
import { Breadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
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
  theme?: Themes;
}

export default function Layout({
  children,
  theme = Themes.light,
}: ILayoutProps) {
  const classes = useStyles();
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <div className={classes.wrapper}>
      <ThemeProvider theme={currentTheme}>
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
            {children}
          </main>
        </Container>
      </ThemeProvider>
    </div>
  );
}
