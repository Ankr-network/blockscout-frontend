import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useModuleEntityBlockStyles = makeStyles<Theme>(theme => ({
  imgMessage: {
    display: 'block',
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(1),
  },
}));
