import { makeStyles } from 'tss-react/mui';

import { CONTENT_WIDTH } from 'modules/layout/components/DefautLayout';

export const useEnterpriseChainsStyles = makeStyles()(() => ({
  endpointsWrapper: {
    maxWidth: CONTENT_WIDTH,
  },
}));
