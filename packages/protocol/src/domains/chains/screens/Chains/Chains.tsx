import React from 'react';
import { Button } from '@material-ui/core';
import { Spinner } from 'ui';

import { ChainsList } from './components/ChainsList';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { ChainsSortSelect } from './components/ChainsSortSelect';
import { H1Tag } from 'uiKit/H1Tag';
import { InfoBanner } from './components/Banner';
import { PageHeader } from 'modules/common/components/PageHeader';
import { UsageSummary } from './components/UsageSummary';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useChains } from './hooks/useChains';
import { useChainsStyles } from './ChainsStyles';

const ENABLE_HOW_TO_INTEGRATE = false;

export const Chains = () => {
  const {
    chains,
    credentials,
    isWalletConnected,
    loading,
    setSortType,
    sortType,
    statsTimeframe,
    switchStatsTimeframe,
  } = useChains();

  useSetBreadcrumbs([
    {
      title: isWalletConnected
        ? t(ChainsRoutesConfig.chains['connected-breadcrumbs'])
        : t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  const classes = useChainsStyles();

  return (
    <>
      {!credentials && <InfoBanner />}
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
