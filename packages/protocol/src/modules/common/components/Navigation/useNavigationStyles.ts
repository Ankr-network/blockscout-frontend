import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const HEADER_HEIGHT_XS = 66;
export const HEADER_HEIGHT_XL = 80;

export const useNavigationStyles = makeStyles()((theme: Theme) => ({
  link: {
    width: '100%',
    height: 48,
    color: theme.palette.text.secondary,
    justifyContent: 'flex-start',
    padding: theme.spacing(2 * 1.5),
    fontWeight: 400,
    cursor: 'pointer',
    position: 'relative',
    '&&': {
      paddingLeft: theme.spacing(2 * 6),
    },
    '&& span:nth-of-type(1)': {
      position: 'absolute',
      left: 0,
      display: 'flex',
      marginRight: theme.spacing(2 * -0.5),
      marginLeft: theme.spacing(2 * 1),
    },
    '&& span:nth-of-type(2)': {
      position: 'absolute',
      left: 0,
      display: 'none',
    },

    '&& svg': {
      fontSize: 24,
      strokeWidth: 1.2,
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(2 * 1),
      },
    },

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.default,
      boxShadow: 'none',
      '& svg': {
        strokeWidth: 2,
        color: theme.palette.primary.main,
      },
    },

    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      color: theme.palette.text.primary,

      '&:after': {
        content: '""',
        display: 'flex',
        position: 'absolute',
        background: theme.palette.background.default,
        height: 2,
        bottom: 0,
        left: 45,
        width: 'calc(90% - 45px)',
      },
    },
  },
  activeLink: {
    '&&': {
      color: theme.palette.primary.main,
      cursor: 'default',
      fontWeight: 600,
      background: theme.palette.background.default,
      '&& svg': {
        strokeWidth: 2,
      },
      '&& span:nth-of-type(1)': {
        display: 'none',
      },
      '&& span:nth-of-type(2)': {
        display: 'flex',
      },
    },
  },
  item: {
    width: '100%',
    height: 48,
    padding: theme.spacing(2 * 1.5),
  },
  skeleton: {
    height: theme.spacing(2 * 3),
    borderRadius: theme.spacing(2 * 0.75),
    backgroundColor: theme.palette.background.default,
  },
}));
