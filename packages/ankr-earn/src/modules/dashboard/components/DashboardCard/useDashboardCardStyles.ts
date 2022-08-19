import { makeStyles } from '@material-ui/core';

enum EAreas {
  tokenInfo = 'tokenInfo',
  menu = 'menu',
  amount = 'amount',
  buttons = 'buttons',
}

export const useDashboardCardStyles = makeStyles(theme => ({
  root: {
    minHeight: 260,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateAreas: `
      "${EAreas.tokenInfo} ${EAreas.menu}"
      "${EAreas.amount} ${EAreas.amount}"
      "${EAreas.buttons} ${EAreas.buttons}"
    `,
    padding: theme.spacing(2.5, 2.5),
    alignContent: 'space-between',
    gap: theme.spacing(2, 2),

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(1.75, 2.5),
      minHeight: 110,
      alignItems: 'center',
      gridTemplateAreas: `
        "${EAreas.tokenInfo} ${EAreas.amount} ${EAreas.buttons}"
      `,
      gridTemplateColumns: '0.7fr 1fr 300px',
      alignContent: 'stretch',
    },

    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: '1.2fr 1fr 300px',
      padding: theme.spacing(1.75, 5, 1.75, 3),
    },
  },

  tokenInfoSlot: {
    gridArea: EAreas.tokenInfo,
  },

  menuSlot: {
    gridArea: EAreas.menu,
  },

  buttonSkeleton: {
    borderRadius: 16,
  },

  amountSlot: {
    gridArea: EAreas.amount,
  },

  buttonsSlot: {
    gridArea: EAreas.buttons,

    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: theme.spacing(0, 2.5),
      alignItems: 'center',
      justifyItems: 'end',
    },
  },
}));
