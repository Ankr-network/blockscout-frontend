import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  top: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 700,

    color: theme.palette.text.primary,
  },

  tooltipWrapper: {
    marginBottom: theme.spacing(2 * 2),
    alignItems: 'flex-end',
  },

  copyToClip: {
    minWidth: 330,
    width: '100%',

    [theme.breakpoints.down('lg')]: {
      minWidth: 'auto',
    },
  },
  label: {
    marginTop: theme.spacing(2 * 1),
  },
}));
