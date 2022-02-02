import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useModuleEntityBlockStyles = makeStyles<Theme>(theme => ({
  blockWrapper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  markdownWrapper: {
    fontSize: 16,
  },
  imgMessage: {
    display: 'block',
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(1),
  },
}));
