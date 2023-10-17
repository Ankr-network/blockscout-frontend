import { makeStyles } from 'tss-react/mui';

export const useAuthCodeInputStyles = makeStyles<boolean>()(
  (theme, hasError: boolean) => ({
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: theme.spacing(3),

      '& input: nth-of-type(3)': {
        marginRight: theme.spacing(10),
      },

      [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(1.5),

        '& input: nth-of-type(3)': {
          marginRight: theme.spacing(0),
        },
      },
    },
    input: {
      width: 70,
      height: 70,
      borderRadius: 17,
      border: `2px solid ${
        hasError ? theme.palette.error.main : 'transparent'
      }`,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      fontSize: 28,
      textAlign: 'center',
      fontWeight: 700,

      outline: 'none',

      '&:focus': {
        color: theme.palette.text.secondary,
      },

      [theme.breakpoints.down('xs')]: {
        width: 44,
        height: 44,
        borderRadius: 12,
        fontSize: 24,
      },
    },
  }),
);
