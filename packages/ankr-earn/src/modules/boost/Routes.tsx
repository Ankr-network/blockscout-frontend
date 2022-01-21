import loadable from '@loadable/component';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { EARN_PATH, featuresConfig } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import React from 'react';
import { generatePath, Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

const ROOT = `${EARN_PATH}/boost`;
const TRADING_COCKPIT_PATH = `${ROOT}/trade`;
const TRADING_COCKPIT_SPECIFIC_PATH = `${TRADING_COCKPIT_PATH}?from=:fromToken?&to=:toToken?`;
const LIQUIDITY_MINING_PATH = `${ROOT}/liquidity-mining`;

export const RoutesConfig = createRouteConfig(
  {
    tradingCockpit: {
      path: TRADING_COCKPIT_PATH,
      generatePath: (fromToken?: string, toToken?: string) =>
        generatePath(TRADING_COCKPIT_SPECIFIC_PATH, {
          fromToken,
          toToken,
        }),
      useParams: () => {
        const query = useQueryParams();
        return {
          fromToken: query.get('from') ?? undefined,
          toToken: query.get('to') ?? undefined,
        };
      },
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
        <Route path={RoutesConfig.root} exact>
          <Redirect to={RoutesConfig.tradingCockpit.path} />
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
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}
