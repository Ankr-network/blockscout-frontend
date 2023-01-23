import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

type Size = 'm' | 'l';

export const useRPCInfoFunStyle = makeStyles<Size>()(
  (theme: Theme, size: Size) => ({
    root: {
      borderRadius: size === 'm' ? 6 : 12,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
      overflow: 'hidden',
      width: '100%',
      padding:
        size === 'm'
          ? theme.spacing(0, 2 * 1.125)
          : theme.spacing(0, 2 * 1.6875),
      cursor: 'pointer',
      background: theme.palette.background.default,
      minHeight: 36,
      transition: 'background .3s',

      '&:hover': {
        background: theme.palette.common.white,

        '& $text': {
          color: theme.palette.text.primary,
        },
      },
    },
    text: {
      marginRight: theme.spacing(2 * 0.5),
      fontSize: size === 'm' ? 12 : 14,
      transition: 'color .3s',
    },
  }),
);
