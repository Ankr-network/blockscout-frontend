import React, { createContext, useContext, useState } from 'react';

import {
  Breadcrumbs as BreadcrumbsBase,
  BreadcrumbItem,
} from 'uiKit/Breadcrumbs';
import {
  BreadcrumbsProviderProps,
  IBreadcrumbsContext,
} from './BreadcrumbsTypes';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export const BreadcrumbsContext = createContext<IBreadcrumbsContext>({
  breadcrumbs: [],
  setBreadcrumbs: () => null,
});

export function BreadcrumbsProvider({ children }: BreadcrumbsProviderProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const handleSetBreadcrumbs = (newBreadcrumbs: BreadcrumbItem[]) => {
    setBreadcrumbs(newBreadcrumbs);
  };

  return (
    <BreadcrumbsContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs: handleSetBreadcrumbs,
      }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  );
}

export const useBreadcrumbs = () => {
  return React.useContext(BreadcrumbsContext);
};

export const useSetBreadcrumbs = (breadcrumbs: BreadcrumbItem[]) => {
  const { setBreadcrumbs } = useBreadcrumbs();

  useOnMount(() => setBreadcrumbs(breadcrumbs));

  return { setBreadcrumbs };
};

export const Breadcrumbs = () => {
  const { breadcrumbs } = useContext(BreadcrumbsContext);

  return <BreadcrumbsBase items={breadcrumbs} />;
};
