import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ReactElement } from 'react';

export const CssModulesPriority = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const cache = createCache({
    key: 'mui',
    prepend: false,
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
