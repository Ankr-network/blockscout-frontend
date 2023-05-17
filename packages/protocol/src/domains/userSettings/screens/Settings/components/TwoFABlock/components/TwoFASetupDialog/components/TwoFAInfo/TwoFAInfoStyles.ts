import { makeStyles } from 'tss-react/mui';

export const useTwoFAInfoStyles = makeStyles()(theme => ({
  root: {
    '& img': {
      display: 'block',
      margin: '0 auto',
    },
  },
  header: {
    '& a': {
      color: theme.palette.primary.main,
    },
  },
  description: {
    '& ul': {
      paddingLeft: theme.spacing(0),
      listStyle: 'none',
      margin: theme.spacing(3, 0),
    },

    '& li': {
      fontSize: 20,
      marginBottom: theme.spacing(1),

      overflowWrap: 'anywhere',

      '&:before': {
        content: "'• '",
        color: theme.palette.primary.main,
      },
    },
  },
  scanProblem: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(7),
  },
}));
