import { Switch, Route, Redirect } from 'react-router';
import { Box } from '@mui/material';

import { Layout } from 'modules/layout/components/Layout';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { ClientsPage } from 'modules/clients/components/ClientsPage';
import { ClientDetailsPage } from 'modules/clients/components/ClientDetailsPage';
import { AdminRoutesConfig } from 'modules/admin/AdminRoutesConfig';
import { AdminPageWrapper } from 'modules/admin/components/AdminPageWrapper';
import { GuardAdminRoute } from 'modules/admin/components/GuardAdminRoute';
import { useSecretRouteAccess } from 'modules/admin/hooks/useSecretRouteAccess';
import { GroupsPageWrapper } from 'modules/groups/components/GroupsPageWrapper';
import { GroupsRoutesConfig } from 'modules/groups/GroupsRoutesConfig';
import { GroupDetails } from 'modules/groups/components/GroupDetails';
import { SignInRoutesConfig } from 'modules/signIn/SignInRoutesConfig';
import { SignInPage } from 'modules/signIn/components/SignInPage/SignInPage';

function GroupsRoutes() {
  return (
    <>
      <Route
        exact
        path={GroupsRoutesConfig.groups.path}
        component={GroupsPageWrapper}
      />
      <Route
        exact
        path={GroupsRoutesConfig.groupDetails.path}
        component={GroupDetails}
      />
    </>
  );
}

function AdminRoutes() {
  return (
    <Route
      exact
      path={AdminRoutesConfig.admin.path}
      component={AdminPageWrapper}
    />
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

function SignInRoutes() {
  return (
    <>
      <Route
        exact
        path={SignInRoutesConfig.signIn.path}
        component={SignInPage}
      />
    </>
  );
}

export const Routes = () => {
  const {
    hasTestDriveTokenCreationAccess,
    hasSecretRouteAccess,
    isLoadingAdminRoles,
  } = useSecretRouteAccess();

  return (
    <Switch>
      <Route
        exact
        path={[SignInRoutesConfig.signIn.path]}
        render={() => (
          <Box>
            <SignInRoutes />
          </Box>
        )}
      />

      <Route
        exact
        path={[
          ClientsRoutesConfig.clients.path,
          ClientsRoutesConfig.clientInfo.path,
        ]}
        render={() => (
          <Layout
            hasSecretRouteAccess={hasSecretRouteAccess}
            hasTestDriveTokenCreationAccess={hasTestDriveTokenCreationAccess}
          >
            <ClientsRoutes />
          </Layout>
        )}
      />

      <Route
        exact
        path={[
          GroupsRoutesConfig.groups.path,
          GroupsRoutesConfig.groupDetails.path,
        ]}
        render={() => (
          <Layout
            hasSecretRouteAccess={hasSecretRouteAccess}
            hasTestDriveTokenCreationAccess={hasTestDriveTokenCreationAccess}
          >
            <GroupsRoutes />
          </Layout>
        )}
      />

      <GuardAdminRoute
        exact
        path={[AdminRoutesConfig.admin.path]}
        hasSecretRouteAccess={hasSecretRouteAccess}
        isLoading={isLoadingAdminRoles}
        render={() => (
          <Layout
            hasSecretRouteAccess={hasSecretRouteAccess}
            hasTestDriveTokenCreationAccess={hasTestDriveTokenCreationAccess}
          >
            <AdminRoutes />
          </Layout>
        )}
      />

      <Redirect exact from="/" to={ClientsRoutesConfig.clients.path} />

      <Route
        render={() => (
          <Layout
            hasSecretRouteAccess={hasSecretRouteAccess}
            hasTestDriveTokenCreationAccess={hasTestDriveTokenCreationAccess}
          >
            <PageNotFound />
          </Layout>
        )}
      />
    </Switch>
  );
};
