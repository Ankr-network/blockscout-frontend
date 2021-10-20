import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'uiKit/Spinner';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_MOBILE_DETAILS = '/details';

export const MobileDetailsRoutesConfig = createRouteConfig(
  {
    details: {
      path: PATH_MOBILE_DETAILS,
      generatePath: () => PATH_MOBILE_DETAILS,
    },
  },
  PATH_MOBILE_DETAILS,
);

const LoadablePlanContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/MobileDetails').then(module => module.MobileDetails),
  {
    fallback: <Spinner />,
  },
);

export function MobileDetailsRoutes() {
  return (
    <>
      <Route
        exact
        path={MobileDetailsRoutesConfig.details.path}
        component={LoadablePlanContainer}
      />
    </>
  );
}
