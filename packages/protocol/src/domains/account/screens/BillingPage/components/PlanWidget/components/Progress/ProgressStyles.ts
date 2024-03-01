import { makeStyles } from 'tss-react/mui';

export const useProgressStyles = makeStyles<number>()(
  (theme, requestsUsed) => ({
    title: {
      marginBottom: theme.spacing(1.25),

      color: theme.palette.grey[600],

      fontSize: 14,
      fontWeight: 400,
      lineHeight: '140%',
    },
    background: {
      position: 'relative',

      height: 10,

      borderRadius: 5,

      backgroundColor: theme.palette.primary.light,
    },
    progress: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,

      width: `${requestsUsed * 100}%`,

      borderRadius: 5,

      backgroundColor: theme.palette.primary.main,
    },
  }),
);
