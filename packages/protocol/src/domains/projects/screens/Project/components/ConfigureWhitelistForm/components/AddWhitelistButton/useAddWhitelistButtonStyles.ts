import { makeStyles } from 'tss-react/mui';

export const useAddWhitelistButtonStyles = makeStyles<boolean>()(
  (theme, isOpened) => ({
    button: {
      height: 32,
      minHeight: 'unset',
      padding: theme.spacing(1.5, 2, 1.5, 3),

      fontSize: 14,
      fontWeight: 500,
      lineHeight: '143%',

      '&:focus': {
        boxShadow: 'none',
      },
    },
    endIcon: {
      marginRight: 0,
      marginLeft: theme.spacing(1),

      transition: 'transform 200ms',

      transform: isOpened ? 'rotate(180deg)' : 'none',
      transformOrigin: '50% 50%',
    },
  }),
);
