import { makeStyles } from 'tss-react/mui';

import { CONTAINER_STYLES } from 'modules/layout/components/DefautLayout';

export const useBaseChainsStyles = makeStyles()(theme => ({
  baseChainsRoot: {
    ...CONTAINER_STYLES,
  },
  baseChainsTitle: {
    marginBottom: theme.spacing(8),
  },
}));
