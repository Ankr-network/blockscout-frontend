import { Grid, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import {
  INetwork,
  useNetworks,
} from 'modules/auth/components/GuardRoute/useNetworks';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { RoutesConfig as RoutesConfigBoost } from 'modules/boost/Routes';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/components/ResponseData';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { BlockchainNetworkId } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { NoAssets } from 'modules/dashboard/components/NoAssets';
import { StakableAsset } from 'modules/dashboard/components/StakableAsset';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { EToken } from 'modules/dashboard/types';
import { t } from 'modules/i18n/utils/intl';
import { fetchStats as fetchStatsPolygon } from 'modules/stake-polygon/actions/fetchStats';
import {
  POLYGON_PROVIDER_ID,
  YEARLY_INTEREST,
} from 'modules/stake-polygon/const';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { Container } from 'uiKit/Container';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { useDashboardStyles as useStyles } from './useDashboardStyles';

interface IDashboardArgs {
  availableNetworks: BlockchainNetworkId[];
}

export const Dashboard = ({ availableNetworks }: IDashboardArgs) => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();
  const polygonProvider = useAuth(POLYGON_PROVIDER_ID, availableNetworks);
  const networks = useNetworks();

  const currentPolygonNetwork = networks.find(
    network => network.chainId === polygonProvider.chainId,
  );

  useInitEffect(() => {
    dispatchRequest(fetchStatsPolygon());
  });

  const MaticAsset = {
    icon: <MaticIcon />,
    token: Token.MATIC,
    href: StakePolygonRoutes.stake.generatePath(),
    apy: YEARLY_INTEREST,
    balance: new BigNumber(0),
    networks: [currentPolygonNetwork as INetwork],
  };

  return (
    <Container className={classes.root}>
      <Queries<ResponseData<typeof fetchStatsPolygon>>
        requestActions={[fetchStatsPolygon]}
      >
        {({ data }) => (
          <>
            {!data.maticBalance.isZero() && (
              <>
                <Typography
                  className={classes.title}
                  component="h1"
                  variant="h3"
                >
                  {t('dashboard.title')}
                </Typography>
                <Grid container spacing={3} className={classes.stakableAssets}>
                  <Grid item md={6} xs={12} lg="auto">
                    <StakableAsset
                      icon={MaticAsset.icon}
                      balance={data.maticBalance}
                      networks={MaticAsset.networks}
                      token={MaticAsset.token}
                      href={MaticAsset.href}
                      apy={MaticAsset.apy}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            <Typography className={classes.assetsTitle} variant="h3">
              {t('dashboard.assets')}
            </Typography>
            {data.aMaticbBalance.isZero() ? (
              <NoAssets />
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <StakingAsset
                    pendingValue={data.pendingClaim.toNumber()}
                    network={t(`chain.${polygonProvider.chainId}`)}
                    token={EToken.aMATICb}
                    amount={data.aMaticbBalance}
                    tradeLink={RoutesConfigBoost.tradingCockpit.generatePath(
                      EToken.aMATICb,
                      'MATIC',
                    )}
                    unstakeLink={StakePolygonRoutes.unstake.generatePath()}
                    stakeLink={StakePolygonRoutes.stake.generatePath()}
                  />
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Queries>
    </Container>
  );
};
