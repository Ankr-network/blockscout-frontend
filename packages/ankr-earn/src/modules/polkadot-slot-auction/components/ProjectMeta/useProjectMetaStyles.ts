import { makeStyles, Theme } from '@material-ui/core';

export const useProjectMetaStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },

  img: {
    width: 28,
    height: 28,
    marginRight: theme.spacing(1),
    borderRadius: 5,
  },
}));
