import { Switch, Route, Redirect } from 'react-router';
import { Layout } from 'modules/layout/components/Layout';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { ClientsPage } from './modules/clients/components/ClientsPage';
import { ClientDetailsPage } from './modules/clients/components/ClientDetailsPage';

function ClientsRoutes() {
  return (
    <>
      <Route
        exact
        path={ClientsRoutesConfig.clients.path}
        component={ClientsPage}
      />

      <Route
        exact
        path={ClientsRoutesConfig.clientInfo.path}
        component={ClientDetailsPage}
      />
    </>
  );
}

export const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path={[
          ClientsRoutesConfig.clients.path,
          ClientsRoutesConfig.clientInfo.path,
        ]}
        render={() => (
          <Layout hasNoReactSnap>
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
