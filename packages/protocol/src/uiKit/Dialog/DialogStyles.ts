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
}

export const useStyles = makeStyles<IUseStylesProps>()(
  (theme: Theme, props: IUseStylesProps) => ({
    root: {
      display: 'fixed',
    },

    backdrop: {
      backgroundColor: alpha(theme.palette.background.default, 0.8),
    },

    paper: {
      '&&': {
        maxWidth: props.maxPxWidth || 'unset',
      },
      background: theme.palette.background.paper,
      boxShadow:
        '0px 0px 25px rgba(31, 34, 38, 0.1), 0px 0px 50px rgba(31, 34, 38, 0.1)',
      borderRadius: 30,
      padding: theme.spacing(2 * 4, 2 * 5, 2 * 5, 2 * 5),

      [theme.breakpoints.down('xs')]: {
        borderRadius: 20,
        padding: theme.spacing(2 * 2.5),
      },
    },

    dialogTitle: {
      padding: 0,
      marginBottom: theme.spacing(2 * 3),
      letterSpacing: '0.05em',

      fontSize: 34,
      fontWeight: 700,
      minHeight: 40,
      color: colorsMap[props.dialogTitleColor],
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
      border: `2px solid ${theme.palette.background.default}`,
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
      },
    },
  }),
);
