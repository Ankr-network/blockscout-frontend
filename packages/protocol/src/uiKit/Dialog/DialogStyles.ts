import { fade, makeStyles, Theme } from '@material-ui/core';
import { mainTheme } from 'ui';
import { DialogTitleColor } from './types';

const colorsMap: Record<DialogTitleColor, string> = {
  [DialogTitleColor.Regular]: 'inherit',
  [DialogTitleColor.ERROR]: mainTheme.palette.error.main,
};

interface IUseStylesProps {
  dialogTitleColor: DialogTitleColor;
  maxPxWidth?: number;
}

export const useStyles = makeStyles<Theme, IUseStylesProps>(theme => ({
  backdrop: {
    backgroundColor: fade(theme.palette.background.default, 0.8),
  },

  paper: {
    maxWidth: ({ maxPxWidth }) => maxPxWidth || 'unset',
    background: theme.palette.background.paper,
    boxShadow:
      '0px 0px 25px rgba(31, 34, 38, 0.1), 0px 0px 50px rgba(31, 34, 38, 0.1)',
    borderRadius: 30,
    padding: theme.spacing(4, 5, 5, 5),

    [theme.breakpoints.down('xs')]: {
      borderRadius: 20,
      padding: theme.spacing(2.5),
    },
  },

  dialogTitle: {
    padding: 0,
    marginBottom: theme.spacing(3),
    letterSpacing: '0.05em',
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },

    '& h2': {
      fontSize: 28,
      fontWeight: 700,
      color: ({ dialogTitleColor }: { dialogTitleColor: DialogTitleColor }) =>
        colorsMap[dialogTitleColor],
      paddingRight: theme.spacing(5),

      [theme.breakpoints.down('xs')]: {
        fontSize: 27,
      },
    },
  },

  dialogContent: {
    padding: 0,
    marginBottom: 0,
    overflowY: 'unset',
  },

  closeButton: {
    position: 'absolute',
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: 14,
    width: 40,
    height: 40,
    fontSize: '2rem',
    right: 0,

    [theme.breakpoints.down('xs')]: {
      width: 32,
      height: 32,
      fontSize: '1.7rem',
      borderRadius: 11,
      right: 0,
      top: 5,
    },

    '& svg': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
}));
