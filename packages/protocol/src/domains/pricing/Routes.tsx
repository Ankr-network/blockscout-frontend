import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PRICING_PATH = '/pricing/';

export const PricingRoutesConfig = createRouteConfig(
  {
    pricing: {
      path: PRICING_PATH,
      generagePath: () => PRICING_PATH,
      breadcrumbs: 'account.account-details.breadcrumbs',
    },
  },
  PRICING_PATH,
);

const LoadablePricingContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Pricing').then(module => module.Pricing),
  {
    fallback: <Spinner />,
  },
);

export function PricingRoutes() {
  return (
    <>
      <Route
        exact
        path={PricingRoutesConfig.pricing.path}
        component={LoadablePricingContainer}
      />
    </>
  );
}
