import { makeStyles } from '@material-ui/core';

import { Seconds } from 'modules/common/types';

const transitionTime: Seconds = 0.25;

export const useTokenVariantStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    fontWeight: 'normal',
    height: '100%',
    padding: theme.spacing(3, 2.5),
    alignItems: 'flex-start',
    transition: `background-color ${transitionTime}s, color ${transitionTime}s, border ${transitionTime}s`,
  },

  active: {
    backgroundColor: theme.palette.background.default,
    cursor: 'default',
    color: theme.palette.text.primary,
    borderColor: theme.palette.primary.main,

    '&:active': {
      transform: 'none',
    },
  },
  unsupported: {
    backgroundColor: theme.palette.background.default,
  },

  label: {
    display: 'block',
    whiteSpace: 'normal',
    textAlign: 'left',
  },

  icon: {
    marginRight: theme.spacing(1),
  },

  comingSoonLabel: {
    margin: theme.spacing(-3, -1, 0, 0),
    padding: theme.spacing(0.625, 1.25, 0.625, 1.25),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    fontSize: 13,
    fontWeight: 500,
    borderRadius: 6,
  },
}));
