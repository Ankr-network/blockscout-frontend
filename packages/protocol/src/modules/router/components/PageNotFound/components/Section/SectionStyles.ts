import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

const RADIUS_MOBILE = 5;
const RADIUS_DESKTOP = 7.5;
export const OFFSET_Y_MOBILE = 6;
export const OFFSET_Y_DESKTOP = 9;

export const useSectionStyles = makeStyles()((theme: Theme) => ({
  section: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },

  stackUp: {
    borderRadius: theme.spacing(2 * RADIUS_MOBILE, 2 * RADIUS_MOBILE, 0, 0),
    marginTop: theme.spacing(2 * -RADIUS_MOBILE),

    [theme.breakpoints.up('lg')]: {
      borderRadius: theme.spacing(2 * RADIUS_DESKTOP, 2 * RADIUS_DESKTOP, 0, 0),
      marginTop: theme.spacing(2 * -RADIUS_DESKTOP),
    },
  },

  stackDown: {
    paddingBottom: theme.spacing(2 * RADIUS_MOBILE + OFFSET_Y_MOBILE),

    [theme.breakpoints.up('lg')]: {
      paddingBottom: theme.spacing(2 * RADIUS_DESKTOP + OFFSET_Y_DESKTOP),
    },
  },
}));
