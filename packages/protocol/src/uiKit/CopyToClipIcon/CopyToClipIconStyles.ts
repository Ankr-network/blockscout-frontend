import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

type Size = 'm' | 'l';

interface Params {
  size: Size;
  isDisabled?: boolean;
}

export const useStyles = makeStyles<Params, 'text' | 'copyIcon' | 'copyText'>()(
  (theme: Theme, { size, isDisabled }: Params, classes) => ({
    text: {
      marginRight: theme.spacing(2 * 0.5),
      fontSize: size === 'm' ? 12 : 14,
      transition: 'color .3s',
    },
    container: {
      borderRadius: size === 'm' ? 6 : 12,
      display: 'flex',
      justifyContent: 'space-between',
      boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
      overflow: 'hidden',
    },

    message: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      color: theme.palette.text.primary,
      background: theme.palette.background.default,
      fontSize: size === 'm' ? 12 : 14,
      textAlign: 'center',
      width: '100%',
      padding:
        size === 'm'
          ? theme.spacing(2 * 1.25, 2 * 1.125, 2 * 1.125)
          : theme.spacing(2 * 1.25, 2 * 1.125),
      lineHeight: 1.43,

      cursor: 'default',
    },

    content: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding:
        size === 'm'
          ? theme.spacing(2 * 1, 2 * 1.125)
          : theme.spacing(2 * 1.25, 2 * 1.6875),
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      background: theme.palette.background.default,
      minHeight: 36,
      transition: 'background .3s',

      '&:hover': {
        background: theme.palette.background.paper,

        [`& .${classes.text}`]: {
          color: theme.palette.text.primary,
        },

        [`& .${classes.copyIcon}, & .${classes.copyText}`]: {
          color: theme.palette.text.primary,
        },
      },
    },

    copyIcon: {
      fontSize: 16,
      marginLeft: theme.spacing(2 * 1),
      color: theme.palette.primary.main,
      transition: 'color .3s',
    },
    copy: {
      display: 'flex',
      alignItems: 'center',
    },
    copyText: {
      fontSize: 14,
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(2 * 1),
      fontWeight: 'bold',
      transition: 'color .3s',
      lineHeight: 1,
    },
  }),
);
