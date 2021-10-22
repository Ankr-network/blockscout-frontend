import React from 'react';

import { Details } from './components/Details';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

export const MobileDetails = () => {
  useSetBreadcrumbs([]);

  return <Details />;
};
