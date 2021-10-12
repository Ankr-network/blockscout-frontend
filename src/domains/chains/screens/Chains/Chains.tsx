import React from 'react';
import { Button } from '@material-ui/core';

import { PageHeader } from 'modules/common/components/PageHeader';
import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from './components/ChainsSortSelect';
import { ChainsList } from './components/ChainsList';

export const Chains = () => {
  return (
    <>
      <PageHeader
        title={t('chains.title')}
        select={<ChainsSortSelect />}
        button={
          <Button
            variant="text"
            color="primary"
            disableElevation={false}
            disabled
          >
            {t('chains.integrate-button')}
          </Button>
        }
      />
      <ChainsList />
    </>
  );
};
