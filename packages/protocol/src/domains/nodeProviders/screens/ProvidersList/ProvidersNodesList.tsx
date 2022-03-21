import React from 'react';

import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ProvidersRoutesConfig } from 'domains/nodeProviders/Routes';
import { NodeProvidersQuery } from './NodeProvidersQuery';

export const ProvidersNodesList = () => {
  useSetBreadcrumbs([
    {
      title: t(ProvidersRoutesConfig.providers.breadcrumbs),
    },
  ]);

  return <NodeProvidersQuery />;
};
