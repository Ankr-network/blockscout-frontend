import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useRPCInfoFunStyle = makeStyles<Theme, { size: 'm' | 'l' }>(
  theme => ({
    root: {
      borderRadius: ({ size }) => (size === 'm' ? 6 : 12),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
      overflow: 'hidden',
      width: '100%',
      padding: ({ size }) => (size === 'm' ? '0 9px' : '0 15px'),
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
      marginRight: theme.spacing(0.5),
      fontSize: ({ size }) => (size === 'm' ? 12 : 14),
      transition: 'color .3s',
    },
  }),
);
