import { alpha, Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useProjectsListStyles = makeStyles<Theme>(
  (theme: Theme): StyleRules => ({
    label: {
      position: 'absolute',
      top: '-4px',
      left: '-34px',
      padding: '4px 9px 4px 9px',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      borderRadius: 7,
    },

    img: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: theme.spacing(1),
    },

    bondTokenValuesCol: {
      fontSize: 14,
    },

    buttonContribute: {
      padding: theme.spacing(0, 5),
      border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
    },
    plus: {
      margin: theme.spacing(-0.5, 0, 0, 1),
      fontSize: 22,
    },

    buttonClaim: {
      padding: theme.spacing(0, 5),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,

      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },

    noCrowdloanArea: {
      padding: theme.spacing(19, 0, 8, 0),
    },
  }),
);
