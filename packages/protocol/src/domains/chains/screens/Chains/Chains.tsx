import { Box } from '@material-ui/core';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import {
  AddEmailBanner,
  IS_ADD_EMAIL_BANNER_ENABLED,
} from 'domains/userSettings/components/AddEmailBanner';
import { PageHeader } from 'modules/common/components/PageHeader';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { Spinner } from 'ui';
import { H1Tag } from 'uiKit/H1Tag';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { useChainsStyles } from './ChainsStyles';
import { InfoBanner } from './components/Banner';
import { ChainsList } from './components/ChainsList';
import { ChainsSortSelect } from './components/ChainsSortSelect';

import { ReactSnapChainsLinksGenerator } from './components/ReactSnapChainsLinksGenerator';
import { UsageSummary } from './components/UsageSummary';
import { useChains } from './hooks/useChains';

export const Chains = () => {
  const {
    chains,
    allChains,
    credentials,
    isConnecting,
    isWalletConnected,
    loading,
    setSortType,
    sortType,
    switchStatsTimeframe,
    timeframe,
  } = useChains();

  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  const classes = useChainsStyles();

  return (
    <>
      {!credentials && !isConnecting && <InfoBanner />}

      {IS_ADD_EMAIL_BANNER_ENABLED && <AddEmailBanner />}

      {isWalletConnected && (
        <UsageSummary
          timeframe={timeframe}
          switchTimeframe={switchStatsTimeframe}
          className={classes.userStats}
        />
      )}
      <H1Tag title={t('meta.public.h1-tag')} />
      <PageHeader
        title={t('chains.title')}
        select={<ChainsSortSelect sortType={sortType} onSelect={setSortType} />}
      />
      <NoReactSnap
        fallback={<ReactSnapChainsLinksGenerator chains={allChains} />}
      >
        <Box className={classes.container}>
          {loading ? (
            <Spinner />
          ) : (
            <ChainsList
              chains={chains}
              allChains={allChains}
              sortType={sortType}
              timeframe={timeframe}
            />
          )}
        </Box>
      </NoReactSnap>
    </>
  );
};
