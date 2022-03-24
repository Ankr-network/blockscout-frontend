import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(6.5),
  },
  tooltipWrapper: {
    marginBottom: theme.spacing(2),
    alignItems: 'flex-end',
  },
  tooltipIcon: {
    '& circle': {
      fill: theme.palette.background.paper,
    },
  },
  container: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(3.75),

    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: theme.spacing(2.5),

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      rowGap: theme.spacing(2),
    },
  },
  title: {
    fontWeight: 700,
  },
  label: {
    display: 'inline',
    marginLeft: theme.spacing(1),
  },
}));
