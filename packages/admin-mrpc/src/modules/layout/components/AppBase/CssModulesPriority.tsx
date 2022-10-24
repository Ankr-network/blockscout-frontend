import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ReactElement } from 'react';

const cache = createCache({
  key: 'mui',
  prepend: false,
});

export const CssModulesPriority = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
