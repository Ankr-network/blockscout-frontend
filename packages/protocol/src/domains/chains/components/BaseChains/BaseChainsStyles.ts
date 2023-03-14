import { makeStyles } from 'tss-react/mui';

import { CONTENT_WIDTH } from 'modules/layout/components/DefautLayout';

export const useBaseChainsStyles = makeStyles()(() => ({
  root: {
    maxWidth: CONTENT_WIDTH,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));
