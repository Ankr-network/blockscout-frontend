import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { GlossaryRouterConfig } from './GlossaryRouterConfig';

const LoadableGlossaryContainer: LoadableComponent<any> = loadable(async () =>
  import('./screens/Glossary').then(module => module.Glossary),
);

const LoadableGlossaryTermContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/GlossaryTerm').then(module => module.GlossaryTerm),
);

export function GlossaryRoutes() {
  return (
    <>
      <Route
        exact
        path={GlossaryRouterConfig.glossary.path}
        component={LoadableGlossaryContainer}
      />
      <Route
        exact
        path={GlossaryRouterConfig.glossaryTerm.path}
        component={LoadableGlossaryTermContainer}
      />
    </>
  );
}
