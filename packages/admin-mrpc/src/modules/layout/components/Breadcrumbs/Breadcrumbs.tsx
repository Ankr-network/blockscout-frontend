import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import isEqual from 'lodash.isequal';

import {
  Breadcrumbs as BreadcrumbsBase,
  BreadcrumbItem,
} from 'uiKit/Breadcrumbs';
import {
  BreadcrumbsProviderProps,
  IBreadcrumbsContext,
} from './BreadcrumbsTypes';

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

const useBreadcrumbs = () => {
  return React.useContext(BreadcrumbsContext);
};

export const useSetBreadcrumbs = (breadcrumbs: BreadcrumbItem[]) => {
  const { setBreadcrumbs } = useBreadcrumbs();

  const ref = useRef<BreadcrumbItem[]>([]);

  useEffect(() => {
    if (!isEqual(breadcrumbs, ref.current)) {
      setBreadcrumbs(breadcrumbs);
    }

    ref.current = breadcrumbs;
  }, [setBreadcrumbs, breadcrumbs]);

  return { setBreadcrumbs };
};

export const Breadcrumbs = () => {
  const { breadcrumbs } = useContext(BreadcrumbsContext);

  return <BreadcrumbsBase items={breadcrumbs} />;
};
