import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  centerBlock: {
    display: 'flex',
    flexDirection: 'column',
    flex: '3 0 auto',
    textAlign: 'center',
    paddingTop: theme.spacing(2 * 16),
    maxWidth: 710,
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(2 * 0),
      maxWidth: 560,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
      paddingTop: theme.spacing(2 * 7.5),

      margin: theme.spacing(2 * 0),
    },
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 700,
    display: 'block',
    marginBottom: theme.spacing(2 * 1),

    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      fontSize: 16,
    },
  },
  headerTitle: {
    fontSize: 52,

    [theme.breakpoints.down('md')]: {
      fontSize: 40,
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
    },

    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  mobileHeaderImg: {
    marginBottom: theme.spacing(2 * 2.5),
  },
  headerPaper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2 * 3.5),
    borderRadius: theme.spacing(2 * 3.5),
    padding: theme.spacing(2 * 3, 2 * 3.5),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2 * 2.5),
      flexDirection: 'column',
    },
  },
  headerPaperTitle: {
    fontSize: 45,
    lineHeight: 1.4,
  },
  headerPaperTitle2: {
    fontSize: 17,
  },
  headerPaperSubTitle: {
    fontSize: 14,
    color: theme.palette.grey[600],
  },
}));
