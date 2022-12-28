import { Box } from '@material-ui/core';
import { ReactNode } from 'react';

import { PageHeader } from 'modules/common/components/PageHeader';
import { t } from 'modules/i18n/utils/intl';
import { Spinner } from 'ui';
import { useBaseChainsStyles } from './BaseChainsStyles';

interface BaseChainsProps {
  top?: ReactNode;
  loading: boolean;
  select: ReactNode;
  children: ReactNode;
}

export const BaseChains = ({
  top,
  loading,
  select,
  children,
}: BaseChainsProps) => {
  const classes = useBaseChainsStyles();

  return (
    <>
      {top}
      <PageHeader title={t('chains.title')} select={select} />
      <Box className={classes.container}>
        {loading ? <Spinner /> : children}
      </Box>
    </>
  );
};
