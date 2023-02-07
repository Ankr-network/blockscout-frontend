import { Switch, Route, Redirect } from 'react-router';
import { Layout } from 'modules/layout/components/Layout';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { ClientsPage } from 'modules/clients/components/ClientsPage';
import { ClientDetailsPage } from 'modules/clients/components/ClientDetailsPage';
import { AdminRoutesConfig } from 'modules/admin/AdminRoutesConfig';
import { AdminPage } from 'modules/admin/AdminPage';
import { GuardAdminRoute } from 'modules/admin/components/GuardAdminRoute';
import { useSecretRouteAccess } from 'modules/admin/hooks/useSecretRouteAccess';

function AdminRoutes() {
  return (
    <Route exact path={AdminRoutesConfig.admin.path} component={AdminPage} />
  );
}

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
  const { hasSecretRouteAccess, isLoadingAdminRoles } = useSecretRouteAccess();

  return (
    <Switch>
      <Route
        exact
        path={[
          ClientsRoutesConfig.clients.path,
          ClientsRoutesConfig.clientInfo.path,
        ]}
        render={() => (
          <Layout hasNoReactSnap hasSecretRouteAccess={hasSecretRouteAccess}>
            <ClientsRoutes />
          </Layout>
        )}
      />

      <GuardAdminRoute
        exact
        path={[AdminRoutesConfig.admin.path]}
        hasSecretRouteAccess={hasSecretRouteAccess}
        isLoading={isLoadingAdminRoles}
        render={() => (
          <Layout hasNoReactSnap hasSecretRouteAccess={hasSecretRouteAccess}>
            <AdminRoutes />
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
