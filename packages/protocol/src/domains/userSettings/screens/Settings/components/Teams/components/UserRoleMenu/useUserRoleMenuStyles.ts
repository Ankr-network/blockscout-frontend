import { makeStyles } from 'tss-react/mui';

import { DEFAULT_MENU_PAPER_SHADOW } from 'modules/common/styles/const';

export const useUserRoleMenuStyles = makeStyles()(theme => ({
  paper: {
    borderRadius: theme.shape.borderRadius,

    boxShadow: DEFAULT_MENU_PAPER_SHADOW,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(),

    padding: theme.spacing(),
  },
  root: {
    width: 272,
    height: 220,
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  learnMore: {
    marginBottom: theme.spacing(4),
  },
  radioGroup: {
    marginBottom: theme.spacing(4),
    gap: theme.spacing(3),
  },
  radio: {
    height: 20,
    width: 20,

    /* safari fix for input icons */
    '& svg': {
      width: 24,
      height: 24,
    },
  },
  radioItem: {
    gap: theme.spacing(2),

    '& > span': {
      fontSize: '14px',
      lineHeight: '1.4em',
    },
  },
}));
