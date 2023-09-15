import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { CONTAINER_STYLES } from 'modules/layout/components/DefautLayout';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    ...CONTAINER_STYLES,

    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(2 * 3.5),
    },
  },
}));
