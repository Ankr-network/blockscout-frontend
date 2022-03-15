import loadable from '@loadable/component';
import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import { PageNotFound } from '../common/components/PageNotFound';

import { RoutesConfig } from './RoutesConfig';
import { Restore } from './screens/Restore';

const BridgeMainPage = loadable(
  async () =>
    import('./screens/BridgeMainPage').then(module => module.BridgeMainPage),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route exact path={RoutesConfig.main.path}>
          <DefaultLayout>
            <BridgeMainPage />
          </DefaultLayout>
        </Route>

        <Route path={RoutesConfig.restore.path}>
          <DefaultLayout>
            <Restore />
          </DefaultLayout>
        </Route>

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}
