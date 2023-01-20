import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2 * 3.2),
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(2 * 3.75),
  },
  tooltipWrapper: {
    marginBottom: theme.spacing(2 * 2),
    alignItems: 'flex-end',
  },
  tooltipIcon: {
    '& circle': {
      fill: theme.palette.background.default,
    },
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: theme.spacing(2 * 2.5),

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      rowGap: theme.spacing(2 * 2),
    },
  },
  summary: {
    fontWeight: 700,
  },
  title: {
    fontSize: 14,
    lineHeight: theme.spacing(2 * 2.5),
    fontWeight: 700,
    letterSpacing: '0.01em',
  },
  label: {
    display: 'inline',
    marginLeft: theme.spacing(2 * 1),
  },
}));
