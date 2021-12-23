import { Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useProjectsListStyles = makeStyles<Theme>(
  (theme: Theme): StyleRules => ({
    label: {
      position: 'absolute',
      top: 0,
      left: -8,
      padding: theme.spacing(0.5, 1.25),
      fontSize: 13,
      lineHeight: 1,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      borderRadius: 7,
    },

    img: {
      width: 28,
      height: 28,
      marginRight: theme.spacing(1),
      borderRadius: 5,
    },

    bondTokenValuesCol: {
      fontSize: 14,
    },

    button: {
      position: 'relative',

      '& svg': {
        position: 'absolute',
      },
    },
    plus: {
      margin: theme.spacing('1px', 0, 0, 1),
      fontSize: 22,
    },

    noCrowdloanArea: {
      padding: theme.spacing(19, 0, 8, 0),
    },
  }),
);
