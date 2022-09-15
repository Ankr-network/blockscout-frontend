import { makeStyles } from '@material-ui/core';

enum EAreas {
  icon = 'icon',
  token = 'token',
  apy = 'apy',
}

export const useTokenWithIconStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'start',
    gap: theme.spacing(0.5, 1),
    gridTemplateAreas: `
      "${EAreas.icon} ${EAreas.token}"
      "${EAreas.icon} ${EAreas.apy}"
    `,
  },

  icon: {
    gridArea: EAreas.icon,
    width: '1em',
    height: '1em',
    fontSize: 36,

    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
  },

  token: {
    gridArea: EAreas.token,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
  },

  apy: {
    gridArea: EAreas.apy,
    fontSize: 12,
    color: theme.palette.text.secondary,
    lineHeight: 1,
  },
}));
