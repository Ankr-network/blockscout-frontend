import { createContext } from 'react';

import { IBreadcrumbsContext } from './types';

export const BreadcrumbsContext = createContext<IBreadcrumbsContext>({
  breadcrumbs: [],
  setBreadcrumbs: () => null,
});
