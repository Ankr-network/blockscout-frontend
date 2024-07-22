import { makeStyles } from 'tss-react/mui';

import { DIALOG_BREAKDOWN } from '../UpgradePlanDialog/const';

const Y_SCALE_BREAKDOWN = 770;
const scaleMedia = `@media (max-height: ${Y_SCALE_BREAKDOWN}px)`;

interface IPlansDialogStylesParams {
  windowHeight: number;
}

export const usePlansDialogStyles = makeStyles<IPlansDialogStylesParams>()(
  (theme, { windowHeight }) => ({
    dialogTitle: {
      textAlign: 'center',
      margin: theme.spacing(0, 0, 10, 0),
      fontSize: 35,
      color: theme.palette.grey[900],
    },
    itemWrapper: {
      border: `4px solid ${theme.palette.divider}`,
      borderRadius: 32,
    },
    entreprise: {
      borderColor: theme.palette.primary.main,
    },
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      columnGap: theme.spacing(7),
      rowGap: theme.spacing(7),
      minHeight: 470,

      [theme.breakpoints.down(DIALOG_BREAKDOWN)]: {
        gridAutoFlow: 'row',
        gridTemplateColumns: 'auto',
      },
    },
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
      marginTop: theme.spacing(10),
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
    planRoot: {
      '&&&': {
        borderRadius: 32,
      },
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);
