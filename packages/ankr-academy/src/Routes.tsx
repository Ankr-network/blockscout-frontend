import { Redirect, Route, Switch } from 'react-router-dom';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import { AcademyRoutes, AcademyRoutesConfig } from 'domains/academy/Routes';
import { LibraryRoutes } from 'domains/library/Routes';
import { LibraryRoutesConfig } from 'domains/library/LibraryRouterConfig';
import { GlossaryRouterConfig } from 'domains/glossary/GlossaryRouterConfig';
import { GlossaryRoutes } from 'domains/glossary/Routes';
import { useGlossaryLoading } from 'domains/glossary/hooks';

export function Routes() {
  // request glossary items from strapi
  useGlossaryLoading();

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
        path={[LibraryRoutesConfig.lesson.path, LibraryRoutesConfig.exam.path]}
        render={() => (
          <DefaultLayout isFooterDisabled>
            <LibraryRoutes />
          </DefaultLayout>
        )}
      />
      <Route
        exact
        path={[
          GlossaryRouterConfig.glossary.path,
          GlossaryRouterConfig.glossaryTerm.path,
        ]}
        render={() => (
          <DefaultLayout>
            <GlossaryRoutes />
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
