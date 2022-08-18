import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useRequestsByIPStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4, 3.75, 3.125, 3.125),
    borderRadius: theme.spacing(3),
    background: theme.palette.background.paper,
    marginBottom: theme.spacing(3.75),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2.5),
    },
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(3.75),
  },
  title: {
    fontSize: 20,
    lineHeight: '30px',
  },
  timeframe: {
    color: theme.palette.grey[600],
    border: `1px solid ${theme.palette.action.disabledBackground}`,
    marginLeft: theme.spacing(1),
    padding: '3px 7px',
    fontSize: 11,
    fontWeight: 500,
    lineHeight: '16px',
    borderRadius: 18,
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  legendText: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '20px',
    color: theme.palette.grey[600],
  },
  legend: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    maxWidth: theme.spacing(43.25),
    paddingBottom: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
  },
  info: {
    width: '100%',
    maxWidth: theme.spacing(43.25),
  },
  infoText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
  },
  line: {
    margin: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  graphic: {
    width: `calc(100% - ${theme.spacing(43.25 + 3.75)}px)`,
  },
  graphicLine: {
    height: theme.spacing(3),
    padding: '9px 0',
    margin: theme.spacing(1, 0),
    position: 'relative',
    '&:after': {
      content: '" "',
      position: 'absolute',
      backgroundColor: '#BFC6D0',
      width: '100%',
      height: 6,
      borderRadius: theme.spacing(0.5),
    },
  },
}));
