import loadable from '@loadable/component';
import { featuresConfig } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import React from 'react';
import { generatePath, Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

const ROOT = '/boost';
const TRADING_COCKPIT_PATH = `${ROOT}/trading-cockpit`;
const LIQUIDITY_MINING_PATH = `${ROOT}/liquidity-mining`;

export const RoutesConfig = createRouteConfig(
  {
    tradingCockpit: {
      path: TRADING_COCKPIT_PATH,
      generatePath: () => generatePath(TRADING_COCKPIT_PATH),
    },
    liquidityMining: {
      path: LIQUIDITY_MINING_PATH,
      generatePath: () => generatePath(LIQUIDITY_MINING_PATH),
    },
  },
  ROOT,
);

const TradingCockpit = loadable(
  async () =>
    import('./screens/TradingCockpit').then(module => module.TradingCockpit),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LiquidityMining = featuresConfig.liquidityMining
  ? loadable(
      async () =>
        import('./screens/LiquidityMining').then(
          module => module.LiquidityMining,
        ),
      {
        fallback: <QueryLoadingAbsolute />,
      },
    )
  : 'span';

export function getRoutes() {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route path={ROOT} exact>
          <Redirect to={TRADING_COCKPIT_PATH} />
        </Route>

        <Route path={RoutesConfig.tradingCockpit.path} exact>
          <DefaultLayout>
            <TradingCockpit />
          </DefaultLayout>
        </Route>

        {featuresConfig.liquidityMining && (
          <Route path={RoutesConfig.liquidityMining.path} exact>
            <DefaultLayout>
              <LiquidityMining />
            </DefaultLayout>
          </Route>
        )}

        <Route>
          {/* todo: use 404 page component */}
          <DefaultLayout>404</DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}
