import { ReactNode, useMemo, useState } from 'react';

import { BreadcrumbItem } from 'uiKit/Breadcrumbs';

import { BreadcrumbsContext } from './const';
import { IBreadcrumbsContext } from './types';

export interface BreadcrumbsProviderProps {
  children: ReactNode;
}

export const BreadcrumbsProvider = ({ children }: BreadcrumbsProviderProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const value = useMemo<IBreadcrumbsContext>(
    () => ({ breadcrumbs, setBreadcrumbs }),
    [breadcrumbs],
  );

  return (
    <BreadcrumbsContext.Provider value={value}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};
