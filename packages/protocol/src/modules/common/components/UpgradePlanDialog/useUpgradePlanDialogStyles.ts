import { makeStyles } from 'tss-react/mui';

import { DIALOG_BREAKDOWN } from './const';

const Y_SCALE_BREAKDOWN = 770;
const scaleMedia = `@media (max-height: ${Y_SCALE_BREAKDOWN}px)`;

interface IUpgradePlanDialogStylesParams {
  windowHeight: number;
}

export const useUpgradePlanDialogStyles =
  makeStyles<IUpgradePlanDialogStylesParams>()((theme, { windowHeight }) => ({
    paperRoot: {
      margin: 0,
      width: '100%',

      [theme.breakpoints.up(DIALOG_BREAKDOWN)]: {
        [scaleMedia]: {
          transform: `scale(${windowHeight / Y_SCALE_BREAKDOWN})`,
          transformOrigin: 'center top',
        },
      },
    },
    dialogContainer: {
      [theme.breakpoints.up(DIALOG_BREAKDOWN)]: {
        [scaleMedia]: {
          height: 'unset',
          minHeight: '100%',
        },
      },
    },
    root: {
      marginTop: theme.spacing(2 * 5),
      margin: '0 auto',

      [theme.breakpoints.down('sm')]: {
        width: 'unset',
      },
    },
    title: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      marginBottom: theme.spacing(3),
      color: theme.palette.text.primary,

      fontSize: 28,
    },
  }));
