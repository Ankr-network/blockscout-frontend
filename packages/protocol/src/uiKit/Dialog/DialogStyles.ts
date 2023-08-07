import { alpha } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { mainTheme } from 'uiKit/Theme/mainTheme';

import { DialogTitleColor } from './types';

const colorsMap: Record<DialogTitleColor, string> = {
  [DialogTitleColor.Regular]: 'inherit',
  [DialogTitleColor.ERROR]: mainTheme.palette.error.main,
};

interface IUseStylesProps {
  dialogTitleColor: DialogTitleColor;
  maxPxWidth?: number;
  isLightTheme: boolean;
}

export const useStyles = makeStyles<IUseStylesProps>()(
  (
    theme: Theme,
    { dialogTitleColor, maxPxWidth, isLightTheme }: IUseStylesProps,
  ) => ({
    root: {
      display: 'fixed',
    },

    backdrop: {
      backgroundColor: alpha(theme.palette.background.default, 0.8),
    },

    paper: {
      '&::-webkit-scrollbar': {
        width: 3,
        height: 3,
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[300],
        borderRadius: 2,
      },

      '&&': {
        maxWidth: maxPxWidth || 'unset',
      },
      background: theme.palette.background.paper,
      boxShadow:
        '0px 0px 25px rgba(31, 34, 38, 0.1), 0px 0px 50px rgba(31, 34, 38, 0.1)',
      borderRadius: 40,
      padding: theme.spacing(2 * 5),

      [theme.breakpoints.down('xs')]: {
        borderRadius: 20,
        padding: theme.spacing(2 * 2.5),
      },
    },

    dialogTitle: {
      padding: 0,
      marginBottom: theme.spacing(2 * 3),

      fontSize: 34,
      fontWeight: 700,
      minHeight: 40,
      color: colorsMap[dialogTitleColor],
      position: 'relative',

      [theme.breakpoints.down('xs')]: {
        minHeight: 32,
        fontSize: 27,
        marginBottom: theme.spacing(2 * 1),
      },
    },

    dialogContent: {
      padding: 0,
      marginBottom: 0,
      overflowY: 'unset',
    },

    closeButton: {
      border: `2px solid ${
        isLightTheme
          ? theme.palette.background.default
          : theme.palette.grey[100]
      }`,
      borderRadius: 14,
      width: 40,
      height: 40,
      fontSize: '2rem',
      right: 0,
      position: 'absolute',

      [theme.breakpoints.down('xs')]: {
        width: 32,
        height: 32,
        fontSize: '1.7rem',
        borderRadius: 11,
      },

      '& svg': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: isLightTheme ? undefined : theme.palette.common.white,
      },
    },
  }),
);
