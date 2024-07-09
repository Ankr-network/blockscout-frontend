import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { Align } from './types';

const flexAlign: Record<Align, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
};

export const useStyles = makeStyles<Align>()((theme: Theme, align: Align) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: flexAlign[align],
    padding: theme.spacing(10),
    borderRadius: 32,
    width: 600,

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5),
      borderRadius: 20,
    },
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 700,
    fontSize: 34,
    textAlign: align,

    [theme.breakpoints.down('xs')]: {
      fontSize: 27,
    },
  },
  description: {
    marginBottom: theme.spacing(8),
    fontSize: 17,
    textAlign: 'center',

    '& a': {
      color: theme.palette.primary.main,

      '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      },
    },
  },
  image: {
    margin: 'auto',
    marginBottom: theme.spacing(4),
  },
}));
