import { Redirect, Route, Switch } from 'react-router-dom';
import { AcademyRoutes, AcademyRoutesConfig } from 'domains/academy/Routes';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import { LibraryRoutes, LibraryRoutesConfig } from './domains/library/Routes';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={AcademyRoutesConfig.academy.path} />
      </Route>
      <Route
        exact
        path={[AcademyRoutesConfig.academy.path]}
        render={() => (
          <DefaultLayout>
            <AcademyRoutes />
          </DefaultLayout>
        )}
      />
      <Route
        exact
        path={[LibraryRoutesConfig.library.path]}
        render={() => (
          <DefaultLayout>
            <LibraryRoutes />
          </DefaultLayout>
        )}
      />
      <Route
        render={() => (
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        )}
      />
    </Switch>
  );
}
