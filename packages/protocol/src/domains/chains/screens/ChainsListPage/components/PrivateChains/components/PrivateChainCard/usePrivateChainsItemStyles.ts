import { makeStyles } from 'tss-react/mui';
import { alpha } from '@mui/material';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const usePrivateChainsItemStyles = makeStyles()(theme => ({
  privateChainActions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    width: '100%',
  },
  chainProjects: {
    paddingRight: theme.spacing(1),
    marginRight: 'auto',
    display: 'flex',
    gap: theme.spacing(2),
    overflow: 'hidden',
  },
  privateChainCopyEndpointButton: {
    minWidth: 'auto',
    minHeight: 30,
    height: 30,
    width: 32,
  },
  privateActionsButtonLarge: {
    width: 'auto',
    whiteSpace: 'nowrap',
  },
  chainCardMenuPaper: {
    backgroundImage: 'none',
  },
  privateChainAddNetworkButton: {
    width: 'auto',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    border: 'none',
    height: 40,
    whiteSpace: 'nowrap',
    fontSize: 16,
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.grey[100],
    },
  },
  projectLink: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.secondary,
    borderBottom: `1px solid ${alpha(theme.palette.link.main, 0.5)}`,
    textDecoration: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '&:hover': {
      color: theme.palette.text.secondary,
      borderBottom: `1px solid ${theme.palette.link.main}`,
      textDecoration: 'none',
    },
  },
  projectLinkName: {
    whiteSpace: 'nowrap',
  },
  notAddedText: {
    borderBottom: `1px dashed ${theme.palette.link.main}`,
  },
  chainCardBtnMore: {
    minWidth: 'auto',
    padding: 0,
    height: 32,
    width: 32,
    border: `2px solid ${isLightTheme(theme) ? '#F2F5FA' : '#1F2226'}`,
    borderRadius: 12,
    flexShrink: 0,

    svg: {
      width: 20,
      height: 20,
    },

    '&:hover': {
      borderColor: theme.palette.grey[100],
    },
  },

  chainCardBtnMoreActive: {
    borderColor: theme.palette.grey[100],
  },
  chainCardBtnMoreIcon: {
    '&&': {
      color: theme.palette.primary.main,
    },
  },
  privateChainAddToProjectButton: {
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.grey[100],
    },
  },
  addToProjectButtonEmptyState: {
    minWidth: 'auto',
    height: 30,
    minHeight: 30,
    width: 30,
    borderRadius: 11,
  },
  menuButtonPlaceholder: {
    width: 30,
  },
  menuButtonPlaceholderHidden: {
    display: 'none',
  },
}));
