import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useProjectHeaderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  mainInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    maxWidth: '55%',
  },
  projectTitleWrapper: {
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'flex-start',
    maxWidth: '100%',
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  actions: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  freezeButton: {
    '&:disabled': {
      backgroundColor: 'transparent',
      boxShadow: `${
        isLightTheme(theme) ? '#F2F5FA' : '#1F2226'
      } 0px 0px 0px 2px`,
    },
  },
  docsButton: {
    minWidth: 'auto',
    padding: theme.spacing(0, 2),
  },
  editInfoBtn: {
    fontSize: 14,
  },
}));
