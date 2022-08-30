import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  title: {
    marginRight: 35,

    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,

    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(2.5),

      fontSize: theme.spacing(1.5),
      lineHeight: `${theme.spacing(2.5)}px`,
    },
  },
}));
