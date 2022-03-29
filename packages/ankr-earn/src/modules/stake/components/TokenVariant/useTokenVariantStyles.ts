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

  label: {
    display: 'block',
    whiteSpace: 'normal',
    textAlign: 'left',
  },

  icon: {
    marginRight: theme.spacing(1),
  },
}));
