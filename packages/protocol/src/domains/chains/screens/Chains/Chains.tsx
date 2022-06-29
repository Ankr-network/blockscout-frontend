import React from 'react';
import { Button, Typography } from '@material-ui/core';

import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { PageHeader } from 'modules/common/components/PageHeader';
import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from './components/ChainsSortSelect';
import { ChainsList } from './components/ChainsList';
import { ChainBlock } from './components/ChainBlock';
import { fetchPublicChainsInfo } from 'domains/chains/actions/fetchPublicChainsInfo';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { useChainsStyles } from './ChainsStyles';
import { usePublicChainsInfo } from './ChainsUtils';
import { H1Tag } from 'uiKit/H1Tag';
import { useSortSelect } from './components/ChainsSortSelect/ChainsSortSelectUtils';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { InfoBanner } from './components/Banner';

const ENABLE_HOW_TO_INTEGRATE = false;

const SHOW_STATISTICS = false;
const SHOW_UNIQUE_USERS_SERVED = false;
const SHOW_TOTAL_REQUESTS_MADE = false;
const SHOW_TOTAL_ASSET_VALUE_TRANSFERRED = false;

const totalRequestsData = '';
const loading = false;

export const Chains = () => {
  const { isWalletConnected, credentials } = useAuth();

  const classes = useChainsStyles();
  usePublicChainsInfo();

  useSetBreadcrumbs([
    {
      title: isWalletConnected
        ? t(ChainsRoutesConfig.chains['connected-breadcrumbs'])
        : t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  const [sortType, onSetSortType] = useSortSelect();

  return (
    <>
      {!credentials && <InfoBanner />}
      {SHOW_STATISTICS && (
        <>
          <Typography variant="h5" noWrap className={classes.title}>
            {t('30-days-statistics.title')}
          </Typography>
          <div className={classes.blockList}>
            {SHOW_TOTAL_REQUESTS_MADE && (
              <ChainBlock
                isLoading={loading}
                subtitle={t('30-days-statistics.total-requests-made')}
                value={totalRequestsData}
              />
            )}
            {SHOW_UNIQUE_USERS_SERVED && (
              <ChainBlock
                isLoading={loading}
                subtitle={t('30-days-statistics.unique-users-served')}
                value="41,462,731"
              />
            )}
            {SHOW_TOTAL_ASSET_VALUE_TRANSFERRED && (
              <ChainBlock
                isLoading={loading}
                subtitle={t('30-days-statistics.total-asset-value-transferred')}
                value="$135,564,991,200"
              />
            )}
          </div>
        </>
      )}
      <H1Tag title={t('meta.public.h1-tag')} />
      <PageHeader
        title={t('chains.title')}
        select={
          <ChainsSortSelect sortType={sortType} onSelect={onSetSortType} />
        }
        button={
          ENABLE_HOW_TO_INTEGRATE && (
            <Button variant="text" color="primary" disabled>
              {t('chains.integrate-button')}
            </Button>
          )
        }
      />
      <Queries<ResponseData<typeof fetchPublicChainsInfo>>
        requestActions={[fetchPublicChainsInfo]}
      >
        {({ data }) => <ChainsList data={data} sortType={sortType} />}
      </Queries>
    </>
  );
};
