import { makeStyles } from 'tss-react/mui';

export const usePersonalIconStyles = makeStyles()(theme => ({
  root: {
    '&&': {
      color: theme.palette.background.paper,

      fontSize: 32,
    },
  },
}));
