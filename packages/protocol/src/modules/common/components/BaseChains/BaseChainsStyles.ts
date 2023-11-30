import { makeStyles } from 'tss-react/mui';

import { CONTAINER_STYLES } from 'modules/layout/components/DefautLayout';

export const useBaseChainsStyles = makeStyles()(() => ({
  root: {
    ...CONTAINER_STYLES,
  },
  content: {
    position: 'relative',
  },
  search: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));
