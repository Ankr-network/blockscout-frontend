import { makeStyles, Theme } from '@material-ui/core/styles';

export const useCheckboxStyles = makeStyles<Theme>(theme => ({
  root: {
    alignItems: 'flex-start',
  },
  checkbox: {
    marginTop: theme.spacing(-1),
  },
}));
