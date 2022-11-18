import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';

import { Section } from 'modules/delegate-stake/components/Section';

import { ProvidersTable } from './components/ProvidersTable';
import { useProvidersTable } from './hooks/useProvidersTable';
import { useSelectProviderStyles } from './useSelectProviderStyles';

export const SelectProvider = (): JSX.Element => {
  const classes = useSelectProviderStyles();

  const { isLoading, data } = useProvidersTable();

  return (
    <Section>
      <Typography className={classes.title} variant="h3">
        {t('stake-ankr.select-provider.title')}
      </Typography>

      <ProvidersTable data={data} isLoading={isLoading} />
    </Section>
  );
};
