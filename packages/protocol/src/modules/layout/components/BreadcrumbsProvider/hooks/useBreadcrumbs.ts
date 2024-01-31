import { useContext } from 'react';

import { BreadcrumbsContext } from '../const';

export const useBreadcrumbs = () => useContext(BreadcrumbsContext);
