import { ChainsRoutesConfig } from 'domains/chains/routes';
import { AddEmailBanner } from 'domains/userSettings/components/AddEmailBanner';
import { PageHeader } from 'modules/common/components/PageHeader';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { Spinner } from 'ui';
import { H1Tag } from 'uiKit/H1Tag';
import { useChainsStyles } from './ChainsStyles';
import { InfoBanner } from './components/Banner';
import { ChainsList } from './components/ChainsList';
import { ChainsSortSelect } from './components/ChainsSortSelect';
import { NoReactSnap } from 'uiKit/NoReactSnap';

import { UsageSummary } from './components/UsageSummary';
import { ReactSnapChainsLinksGenerator } from './components/ReactSnapChainsLinksGenerator';
import { useChains } from './hooks/useChains';
import { MaintenanceBanner } from '../ChainItem/components/MaintenanceBanner';

export const Chains = () => {
  const {
    chains,
    credentials,
    isConnecting,
    isWalletConnected,
    loading,
    setSortType,
    sortType,
    statsTimeframe,
    switchStatsTimeframe,
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
      {credentials && <MaintenanceBanner />}

      <AddEmailBanner />

      {isWalletConnected && (
        <UsageSummary
          timeframe={statsTimeframe}
          switchTimeframe={switchStatsTimeframe}
          className={classes.userStats}
        />
      )}
      <H1Tag title={t('meta.public.h1-tag')} />
      <PageHeader
        title={t('chains.title')}
        select={<ChainsSortSelect sortType={sortType} onSelect={setSortType} />}
      />
      <NoReactSnap fallback={<ReactSnapChainsLinksGenerator chains={chains} />}>
        {loading ? (
          <Spinner />
        ) : (
          <ChainsList
            chains={chains}
            sortType={sortType}
            statsTimeframe={statsTimeframe}
          />
        )}
      </NoReactSnap>
    </>
  );
};
