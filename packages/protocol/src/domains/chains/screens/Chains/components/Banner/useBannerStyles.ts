import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useBannerStyles = makeStyles()((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 20,
    width: '100%',
    marginBottom: theme.spacing(2 * 6.5),
    fontSize: 16,
  },
  info: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2 * 2.5),
    boxSizing: 'content-box',
    textAlign: 'center',
  },
  banner: {
    padding: theme.spacing(2 * 3.75),
  },
  message: {
    maxWidth: 610,
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2 * 3.75),
    },
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  content: {
    fontWeight: 700,
    marginLeft: theme.spacing(2 * 1.75),
    lineHeight: theme.spacing(2 * 3),
  },
  text: {
    marginRight: '0.5em',
    '& .link': {
      color: theme.palette.primary.main,
    },
  },
  link: {
    padding: 0,
    height: 'auto',
    fontSize: 16,
    lineHeight: theme.spacing(2 * 3),
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    },
  },
  button: {
    minWidth: 176,
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
  },
}));
