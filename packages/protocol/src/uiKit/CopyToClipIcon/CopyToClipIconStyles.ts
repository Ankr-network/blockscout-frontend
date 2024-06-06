import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

type Size = 'm' | 'l';

interface Params {
  size: Size;
  isDisabled?: boolean;
}

export const useStyles = makeStyles<Params, 'text' | 'copyIcon' | 'copyText'>()(
  (theme: Theme, { isDisabled, size }: Params, classes) => ({
    text: {
      marginRight: theme.spacing(1),
      fontSize: size === 'm' ? 12 : 16,
      transition: 'color .3s',
    },
    container: {
      borderRadius: size === 'm' ? 6 : 12,
      display: 'flex',
      justifyContent: 'space-between',
      boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
      overflow: 'hidden',
      height: size === 'm' ? 36 : 40,
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
          ? theme.spacing(2, 2.25, 2 * 2.25)
          : theme.spacing(2.25, 2.25),

      cursor: 'default',
    },

    content: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding:
        size === 'm' ? theme.spacing(1.5, 2.25) : theme.spacing(2, 3.375),
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
      fontSize: 24,
      marginLeft: theme.spacing(2),
      color: theme.palette.text.secondary,
      transition: 'color .3s',
    },
    copy: {
      display: 'flex',
      alignItems: 'center',
    },
    copyText: {
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(2),
      fontWeight: 'bold',
      transition: 'color .3s',
      lineHeight: 1,
      overflow: 'initial',
      '&&': {
        fontSize: 14,
      },
    },
  }),
);
