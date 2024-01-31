import { makeStyles } from 'tss-react/mui';

import { commonShadow } from 'uiKit/Theme/themeUtils';

export const useGroupMenuStyles = makeStyles()(theme => ({
  paper: {
    borderRadius: 17,
    padding: theme.spacing(3),
    boxShadow: commonShadow,
  },
  accountsList: {
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(),
  },
  list: {
    padding: 0,
  },
  accountActions: {
    display: 'flex',
    flexDirection: 'column',
  },
  createTeamButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  infoIcon: {
    color: theme.palette.grey[400],
    width: 20,
    height: 20,
  },
  accountMenuFooter: {
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  actionButton: {
    justifyContent: 'flex-start',
    fontSize: 14,
    fontWeight: 500,
    width: '100%',
    '&&': {
      padding: theme.spacing(0, 2),
    },

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  signOutButton: {
    color: theme.palette.text.secondary,
  },
}));
