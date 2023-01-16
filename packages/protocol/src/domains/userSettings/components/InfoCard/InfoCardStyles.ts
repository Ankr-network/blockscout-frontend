import { makeStyles, Theme } from '@material-ui/core';

import { Align } from './types';

const flexAlign: Record<Align, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
};

export const useStyles = makeStyles<Theme, { align: Align }>(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: ({ align }) => flexAlign[align],
    padding: theme.spacing(5),
    borderRadius: 30,
    maxWidth: 618,

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2.5),
      borderRadius: 20,
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 700,
    fontSize: 34,
    textAlign: ({ align }) => align,

    [theme.breakpoints.down('xs')]: {
      fontSize: 27,
    },
  },
  description: {
    marginBottom: theme.spacing(4),
    fontSize: 17,
    textAlign: ({ align }) => align,

    '& a': {
      color: theme.palette.primary.main,

      '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      },
    },
  },
}));
