import { Button } from '@material-ui/core';

import { ChainsRoutesConfig } from 'domains/chains/Routes';
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

import { UsageSummary } from './components/UsageSummary';
import { useChains } from './hooks/useChains';

const ENABLE_HOW_TO_INTEGRATE = false;

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
        button={
          ENABLE_HOW_TO_INTEGRATE && (
            <Button variant="text" color="primary" disabled>
              {t('chains.integrate-button')}
            </Button>
          )
        }
      />
      {loading ? (
        <Spinner />
      ) : (
        <ChainsList
          chains={chains}
          sortType={sortType}
          statsTimeframe={statsTimeframe}
        />
      )}
    </>
  );
};
