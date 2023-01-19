import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

interface CopyToClipProps {
  isCopied: boolean;
}

export const useStyles = makeStyles<CopyToClipProps, 'button'>()(
  (theme: Theme, props: CopyToClipProps, classes) => ({
    container: {
      borderRadius: 12,
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'hidden',
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      cursor: 'pointer',
      backgroundColor: props.isCopied
        ? theme.palette.common.white
        : theme.palette.background.default,
      transition: 'background-color .3s',

      '&:hover': {
        backgroundColor: theme.palette.common.white,

        [`& .${classes.button}`]: {
          backgroundColor: theme.palette.primary.dark,
          [theme.breakpoints.down('xs')]: {
            color: theme.palette.common.white,
          },
        },
      },
    },
    text: {
      color: theme.palette.text.primary,
      padding: theme.spacing(2 * 1.375, 2 * 1.875),
      width: '60%',
    },
    button: {
      transition: 'color .3s, background-color .3s',
      width: '40%',
    },
  }),
);
