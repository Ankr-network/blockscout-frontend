import { Switch, Route, Redirect } from 'react-router';
import Layout from 'modules/layout/components/Layout/Layout';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import {
  ClientsRoutesConfig,
  ClientsRoutes,
} from 'modules/clients/ClientsRoutes';

export const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path={[ClientsRoutesConfig.clients.path]}
        render={() => (
          <Layout>
            <ClientsRoutes />
          </Layout>
        )}
      />

      <Redirect exact from="/" to={ClientsRoutesConfig.clients.path} />

      <Route
        render={() => (
          <Layout>
            <PageNotFound />
          </Layout>
        )}
      />
    </Switch>
  );
};
