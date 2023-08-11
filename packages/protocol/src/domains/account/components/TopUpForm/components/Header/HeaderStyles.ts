import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
  },
  title: {
    color: theme.palette.text.secondary,

    letterSpacing: '-0.01em',

    fontSize: 16,
    fontWeight: 700,
    lineHeight: '135%',
  },
  link: {
    height: 'auto',
    minWidth: 'auto',
    minHeight: 'unset',
    padding: '0',

    fontSize: 14,
    fontWeight: 500,
    lineHeight: '143%',

    '&:hover': {
      color: theme.palette.grey[900],
      backgroundColor: 'transparent',
    },
  },
  endIcon: {
    margin: 0,
  },
}));
