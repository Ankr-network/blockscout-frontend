import React from 'react';
import { Button } from '@material-ui/core';

import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { PageHeader } from 'modules/common/components/PageHeader';
import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from './components/ChainsSortSelect';
import { ChainsList } from './components/ChainsList';
import { fetchPublicChainsInfo } from 'domains/chains/actions/fetchPublicChainsInfo';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { UserStats } from './components/UserStats';
import { useChainsStyles } from './ChainsStyles';
import { usePublicChainsInfo } from './ChainsUtils';
import { H1Tag } from 'uiKit/H1Tag';
import { useSortSelect } from './components/ChainsSortSelect/ChainsSortSelectUtils';
import { useAuth } from 'modules/auth/hooks/useAuth';

const ENABLE_HOW_TO_INTEGRATE = false;

export const Chains = () => {
  const { isWalletConnected } = useAuth();

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
      {isWalletConnected && <UserStats className={classes.userStats} />}
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
