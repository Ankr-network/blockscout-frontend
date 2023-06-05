import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { CONTENT_WIDTH } from 'modules/layout/components/DefautLayout';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    maxWidth: CONTENT_WIDTH,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(2 * 3.5),
    },
  },
  banner: {
    maxWidth: CONTENT_WIDTH,
    marginLeft: 'auto',
    marginRight: 'auto',

    backgroundImage: 'none',
    marginBottom: theme.spacing(10),
    display: 'block',
  },
}));
