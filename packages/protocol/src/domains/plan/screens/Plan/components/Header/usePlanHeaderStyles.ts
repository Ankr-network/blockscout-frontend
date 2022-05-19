import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  centerBlock: {
    display: 'flex',
    flexDirection: 'column',
    flex: '3 0 auto',
    textAlign: 'center',
    paddingTop: theme.spacing(10),
    maxWidth: 540,
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0),
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
      paddingTop: 0,
      margin: theme.spacing(0),
    },
  },
  headerTitle: {
    fontSize: 45,
    [theme.breakpoints.down('xs')]: {
      fontSize: 34,
    },
  },
  headerSubTitle: {
    color: theme.palette.grey[600],
    fontSize: 17,
    marginTop: theme.spacing(1),
  },
  headerSubTitle2: {
    marginTop: theme.spacing(2),
    color: theme.palette.grey[700],
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  mobileHeaderImg: {
    marginBottom: theme.spacing(2.5),
  },
  headerLeftImg: {
    position: 'absolute',
    width: 267,
  },
  headerRightImg: {
    position: 'absolute',
    width: 298,
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
      '& $unlockBtn': {
        marginTop: theme.spacing(2.5),
      },
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
  unlockBtn: {
    marginTop: theme.spacing(3.5),
    height: 52,
    padding: theme.spacing(1, 3),
    flexShrink: 0,
  },
  unlockIcon: {
    fontSize: '24px !important',
  },
  unlockBtnTitle: {
    fontSize: 19,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
}));
