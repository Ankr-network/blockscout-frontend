import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useRequestsByIPStyles = makeStyles()((theme: Theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(2 * 4, 2 * 3.75, 2 * 3.125, 2 * 3.125),
    borderRadius: theme.spacing(2 * 3),
    background: theme.palette.background.paper,

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2 * 2.5),
    },
  },
  loading: {
    height: theme.spacing(2 * 26),
  },
  noData: {
    height: theme.spacing(2 * 26),
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(2 * 3.75),
    gridGap: theme.spacing(2 * 1),
  },

  timeframe: {
    color: theme.palette.grey[600],
    border: `1px solid ${theme.palette.action.disabledBackground}`,
    marginLeft: theme.spacing(2 * 1),
    padding: theme.spacing(2 * 0.375, 2 * 0.875),
    fontSize: 11,
    fontWeight: 500,
    lineHeight: theme.spacing(2 * 2),
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
    lineHeight: theme.spacing(2 * 2.5),
    color: theme.palette.grey[600],
  },
  legend: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.divider}`,
    maxWidth: theme.spacing(2 * 43.25),
    paddingBottom: theme.spacing(2 * 1.5),
    marginBottom: theme.spacing(2 * 0.5),
  },
  info: {
    width: '100%',
    maxWidth: theme.spacing(2 * 43.25),
  },
  infoText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: theme.spacing(2 * 3),
    maxWidth: 200,
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    color: theme.palette.text.primary,
  },
  line: {
    margin: theme.spacing(2 * 1, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  graphic: {
    width: `calc(100% - ${theme.spacing(2 * 43.25 + 3.75)})`,
  },
  graphicLine: {
    height: theme.spacing(2 * 3),
    padding: theme.spacing(2 * 1.125, 0),
    margin: theme.spacing(2 * 1, 0),
    position: 'relative',
    '&:after': {
      content: '" "',
      position: 'absolute',
      backgroundColor: theme.palette.grey[300],
      width: '100%',
      height: 6,
      borderRadius: theme.spacing(2 * 0.5),
    },
  },
}));
