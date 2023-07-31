import { makeStyles } from 'tss-react/mui';

export const useEditDialogStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(5),

    marginBottom: theme.spacing(7.5),

    letterSpacing: '-0.03em',

    fontSize: 28,
    fontWeight: 700,
    lineHeight: '110%',

    [theme.breakpoints.down('xs')]: {
      minHeight: 'unset',
      marginBottom: theme.spacing(5),

      letterSpacing: '-0.02em',

      fontSize: 24,
      lineHeight: '115%',
    },
  },
  closeButton: {
    [theme.breakpoints.down('xs')]: {
      width: 40,
      height: 40,
    },
  },
}));
