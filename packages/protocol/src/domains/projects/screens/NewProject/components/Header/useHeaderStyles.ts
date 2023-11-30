import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(8),
  },
  internalRoot: {
    width: '100%',
  },
  title: {
    marginBottom: theme.spacing(8),
  },
  firstRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: theme.palette.primary.main,
    padding: 0,

    '& svg': {
      marginLeft: theme.spacing(1),
    },

    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',

      '& svg': {
        color: theme.palette.text.primary,
      },
    },
  },
}));
