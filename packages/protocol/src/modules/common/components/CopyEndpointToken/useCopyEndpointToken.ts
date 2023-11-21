import { makeStyles } from 'tss-react/mui';

export const useCopyEndpointToken = makeStyles()(theme => ({
  endpoint: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    width: theme.spacing(32),

    '& div': {
      backgroundColor: 'transparent',
      flexDirection: 'row-reverse',
      padding: 0,

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },

    '& svg': {
      color: theme.palette.grey[500],
    },

    '& span': {
      marginLeft: 0,
      color: theme.palette.text.primary,
      fontWeight: 400,
      lineHeight: 1.35,
    },
  },
  text: {
    visibility: 'hidden',
  },
  message: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    padding: 0,
  },
}));
