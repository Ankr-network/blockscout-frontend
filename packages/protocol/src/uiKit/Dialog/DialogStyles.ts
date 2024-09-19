import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { mainTheme } from 'uiKit/Theme/mainTheme';

import { DialogTitleColor } from './types';

const colorsMap: Record<DialogTitleColor, string> = {
  [DialogTitleColor.Regular]: 'inherit',
  [DialogTitleColor.ERROR]: mainTheme.palette.error.main,
};

interface IUseStylesProps {
  dialogTitleColor: DialogTitleColor;
  isHidden?: boolean;
  isLightTheme: boolean;
  maxPxWidth?: number;
}

export const useStyles = makeStyles<IUseStylesProps>()(
  (theme, { dialogTitleColor, isHidden, isLightTheme, maxPxWidth }) => ({
    root: {
      display: isHidden ? 'none' : undefined,
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
        '0px 10px 50px 0px rgba(31, 34, 38, 0.10), 0px 5px 25px 0px rgba(31, 34, 38, 0.10)',
      borderRadius: 20,
      padding: theme.spacing(10),

      [theme.breakpoints.down('xs')]: {
        borderRadius: 20,
        padding: theme.spacing(5),
      },
    },

    dialogTitle: {
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      marginBottom: theme.spacing(3),

      minHeight: 40,
      position: 'relative',

      [theme.breakpoints.down('xs')]: {
        fontSize: 27,
        marginBottom: theme.spacing(2),
      },
    },

    titleText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',

      fontSize: 28,
      fontWeight: 700,
      color: colorsMap[dialogTitleColor],

      [theme.breakpoints.down('xs')]: {
        minHeight: 32,
        fontSize: 20,
      },
    },

    titleWithPaddingRight: {
      paddingRight: '35px',
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
      marginLeft: theme.spacing(10),

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
