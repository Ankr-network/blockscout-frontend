import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background:
      'linear-gradient(180deg, rgba(242, 245, 250, 0) 0%, #F2F5FA 100%), linear-gradient(270deg, #D0DCF9 0%, #E3DCFA 50%, #F4E7DE 100%)',
  },
  centerBlock: {
    display: 'flex',
    flexDirection: 'column',
    flex: '3 0 auto',
    textAlign: 'center',
    paddingTop: theme.spacing(10),
    maxWidth: 710,
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0),
      maxWidth: 560,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
      paddingTop: theme.spacing(7.5),

      margin: theme.spacing(0),
    },
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: theme.spacing(1),

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
    marginBottom: theme.spacing(2.5),
  },
  headerPaper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3.5),
    borderRadius: theme.spacing(3.5),
    padding: theme.spacing(3, 3.5),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2.5),
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
