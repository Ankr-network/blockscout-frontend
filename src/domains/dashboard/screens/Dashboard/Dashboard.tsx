import React from 'react';
import { Button } from '@material-ui/core';

import { PageHeader } from 'modules/common/components/PageHeader';
import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from 'domains/chains/screens/Chains/components/ChainsSortSelect';
import { StarIcon } from 'uiKit/Icons/StarIcon';
import { RpcsList } from './components/RpcsList';
import { useStyles } from './useStyles';

export const Dashboard = () => {
  const classes = useStyles();

  return (
    <>
      <PageHeader
        title={t('dashboard.title')}
        select={<ChainsSortSelect />}
        button={
          <Button
            color="primary"
            startIcon={<StarIcon className={classes.icon} />}
          >
            {t('dashboard.create-rpc-button')}
          </Button>
        }
      />
      <RpcsList />
    </>
  );
};
