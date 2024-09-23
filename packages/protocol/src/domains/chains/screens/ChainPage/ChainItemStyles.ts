import { makeStyles } from 'tss-react/mui';

import { CONTAINER_STYLES } from 'modules/layout/components/DefautLayout';

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    ...CONTAINER_STYLES,
  },
}));
