import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<void, 'icon'>()(
  (theme: Theme, _params, classes) => ({
    root: {
      display: 'flex',
      gap: 12,
    },
    copyToClip: {
      width: '100%',
      marginBottom: theme.spacing(2 * 5),

      '& h6': {
        lineHeight: 1.4,
      },
    },
    link: {
      minWidth: 40,
      height: 40,
      boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
      background: theme.palette.background.default,

      '&:hover': {
        background: theme.palette.background.paper,
        boxShadow: `0 0 0 2px ${theme.palette.background.default}`,

        [`& .${classes.icon}`]: {
          color: theme.palette.text.primary,
        },
      },

      [`& span`]: {
        marginLeft: 0,
        marginRight: 0,
      },
    },

    icon: {
      transition: 'color .3s',
    },
  }),
);
