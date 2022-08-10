import { Theme, makeStyles } from '@material-ui/core';

export const useEndpointsHeaderStyles = makeStyles<Theme>(theme => ({
  endpointsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),

    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,
  },
}));
