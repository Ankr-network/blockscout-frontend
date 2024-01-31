import isEqual from 'lodash.isequal';
import { useEffect, useRef } from 'react';

import { BreadcrumbItem } from 'uiKit/Breadcrumbs';

import { useBreadcrumbs } from './useBreadcrumbs';

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
