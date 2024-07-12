import { makeStyles } from 'tss-react/mui';

import { commonShadow } from 'uiKit/Theme/themeUtils';

export const useGroupMenuStyles = makeStyles()(theme => ({
  paper: {
    borderRadius: 17,
    padding: theme.spacing(6, 5),
    boxShadow: commonShadow,
    maxWidth: 300,
  },
  divider: {
    margin: theme.spacing(3, 'auto', 0, 'auto'),
    height: 1,
    border: 'none',
    backgroundColor: theme.palette.grey[100],
    width: '100%',
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
    '&&&': {
      padding: 0,
    },
  },
  accountActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    marginTop: theme.spacing(3),
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
    paddingTop: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  actionButton: {
    justifyContent: 'flex-start',
    fontSize: 14,
    fontWeight: 500,
    width: '100%',
    gap: 16,
    '&&': {
      padding: theme.spacing(0, 2, 0, 1.5),
    },

    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  signOutButton: {
    width: 106,
    padding: theme.spacing(0, 3, 0, 2),
    color: theme.palette.text.secondary,
  },
}));
