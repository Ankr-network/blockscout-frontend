import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PRICING_PATH = '/pricing';

export const PricingRoutesConfig = createRouteConfig(
  {
    pricing: {
      path: PRICING_PATH,
      generatePath: () => PRICING_PATH,
      breadcrumbs: 'plan.breadcrumbs',
    },
  },
  PRICING_PATH,
);

const LoadablePricingContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Pricing').then(module => module.Pricing),
  {
    fallback: <OverlaySpinner />,
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
