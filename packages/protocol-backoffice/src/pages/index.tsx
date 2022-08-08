import {
  HomeOutlined,
  PropertySafetyOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Redirect, Switch, useLocation } from 'react-router-dom';

import { GuardAuthRoute } from 'auth/components/GuardAuthRoute';
import { ClientDetailPage } from './ClientDetailPage';
import { ClientPage } from './ClientPage';
import { HomePage } from './HomePage';
import { WorkerPage } from './WorkerPage';
import { Sidebar } from 'layout/components/Sidebar';
import { Header } from 'layout/components/Header';

export type TRoute = {
  path: string;
  key: string;
  isMenuItem: boolean;
  menuText?: string;
  menuIcon?: React.ReactNode;
  component: React.ComponentType;
};

const Routes: Record<string, TRoute> = {
  home: {
    path: '/',
    key: '/',
    menuText: 'Consensus',
    isMenuItem: true,
    menuIcon: <HomeOutlined />,
    component: HomePage,
  },
  worker: {
    path: '/worker',
    key: '/worker',
    menuText: 'Worker',
    isMenuItem: true,
    menuIcon: <PropertySafetyOutlined />,
    component: WorkerPage,
  },
  clients: {
    path: '/clients',
    key: '/clients',
    menuText: 'Clients',
    isMenuItem: true,
    menuIcon: <UsergroupAddOutlined />,
    component: ClientPage,
  },
  clientDetails: {
    path: '/clients/:address',
    key: '/clients',
    isMenuItem: false,
    component: ClientDetailPage,
  },
};

const routes = Object.values(Routes);

const findMatchingMenuItemKey = (pathname: string): string[] => {
  const getPath = (fullPath: string) => `/${fullPath.split('/')[1]}`;
  const target = getPath(pathname);

  const matched = Object.values(Routes).find(
    route => target === getPath(route.path),
  );

  if (matched) return [matched.path];

  return [];
};

const IndexPage = observer(() => {
  const { pathname } = useLocation();
  const currentPage = useMemo(
    () => findMatchingMenuItemKey(pathname),
    [pathname],
  );

  return (
    <div
      style={{ display: 'flex', minHeight: 'inherit', alignItems: 'stretch' }}
    >
      <Sidebar currentPage={currentPage} routes={routes} />
      <div style={{ width: '100%', padding: '0 20px 0', position: 'relative' }}>
        <Header />
        <Switch>
          {routes.map(({ path, component }) =>
            component ? (
              <GuardAuthRoute
                exact
                key={path}
                path={path}
                component={component}
              />
            ) : null,
          )}

          <Redirect to={Routes.home.path} />
        </Switch>
      </div>
    </div>
  );
});

export default IndexPage;
