import { Theme } from '@material-ui/core';
import { makeStyles, StyleRules } from '@material-ui/core/styles';

export const useProjectsListClaimModalStyles = makeStyles<Theme>(
  (theme: Theme): StyleRules => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },

    containerArea: {
      position: 'relative',
      width: 700,
      height: 'auto',
      margin: theme.spacing('90px', 'auto', '90px', 'auto'),
      backgroundColor: theme.palette.background.paper,
      borderRadius: 18,
    },
    containerSuccessArea: {
      width: 600,
    },
    closeArea: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    bodyArea: {
      margin: theme.spacing('70px', '50px', '50px', '50px'),
    },

    closeBtn: {
      border: 'none',

      '& a:hover': {
        backgroundColor: 'inherit',
      },
    },
  }),
);
