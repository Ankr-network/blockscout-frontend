import { makeStyles } from 'tss-react/mui';
import { lighten } from '@mui/material';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const CHAIN_CARD_GAP = '8px';
export const CHAIN_CARD_PADDING_HORIZONTAL = '32px';

const REQUESTS_COLUMN_WIDTH = 'minmax(110px, 1fr)';

export const CHAIN_CARD_GRID_TEMPLATE_COLUMNS_PRIVATE = `minmax(285px, 1fr) ${REQUESTS_COLUMN_WIDTH} 2fr`;
export const CHAIN_CARD_GRID_TEMPLATE_COLUMNS_PUBLIC = `minmax(265px, 1fr) ${REQUESTS_COLUMN_WIDTH} 1fr`;
export const CHAIN_CARD_GRID_TEMPLATE_COLUMNS_MOBILE = `minmax(220px, 1fr) ${REQUESTS_COLUMN_WIDTH}`;

export const useChainCardStyles = makeStyles<boolean>()(
  (theme, isPublicLayout) => ({
    baseChainCardRoot: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      '&&': {
        padding: theme.spacing(6),
      },
      backgroundColor: theme.palette.background.paper,
      borderRadius: 12,
      minHeight: 200,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: '100%',

      '&:hover': {
        backgroundColor: theme.palette.background.paper,
      },
    },
    baseChainCardListView: {
      minHeight: 'auto',
      height: 'auto',
      alignItems: 'center',

      gap: CHAIN_CARD_GAP,
      display: 'grid',
      gridTemplateColumns: isPublicLayout
        ? CHAIN_CARD_GRID_TEMPLATE_COLUMNS_PUBLIC
        : CHAIN_CARD_GRID_TEMPLATE_COLUMNS_PRIVATE,

      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: CHAIN_CARD_GRID_TEMPLATE_COLUMNS_MOBILE,
      },

      '&&': {
        padding: `${theme.spacing(6)} ${CHAIN_CARD_PADDING_HORIZONTAL}`,

        [theme.breakpoints.down('xs')]: {
          padding: theme.spacing(4.5, 4),
          borderRadius: 0,
          marginLeft: theme.spacing(4),
          marginRight: theme.spacing(4),
          paddingLeft: 0,
          paddingRight: 0,
          borderTop: `1px solid ${theme.palette.divider}`,
        },
      },

      '&:hover': {
        boxShadow: 'none',
      },
    },
    baseChainCardDescription: {
      maxWidth: '100%',
      '& > div': {
        gap: theme.spacing(1.5),
      },
    },
    baseChainCardDescriptionListView: {
      [theme.breakpoints.down('xs')]: {
        gap: theme.spacing(2),
      },

      '& > div': {
        gap: theme.spacing(0.5),
      },
    },
    baseChainCardChainName: {
      [theme.breakpoints.down('xs')]: {
        fontSize: 14,
      },
    },
    secondInfo: {
      width: '100%',
    },
    secondInfoListView: {
      overflow: 'hidden',

      [theme.breakpoints.down('sm')]: {
        textAlign: 'right',
      },
    },
    chainCardActions: {
      width: '100%',
    },
    chainCardActionsListView: {
      padding: theme.spacing(1),
      overflow: 'hidden',
    },
    multichainCard: {
      [theme.breakpoints.up('xs')]: {
        border: `2px solid ${lighten(theme.palette.primary.main, 0.5)}`,
      },
    },
    information: {
      color: theme.palette.grey[isLightTheme(theme) ? 800 : 500],
      display: 'inline-flex',
      flexDirection: 'column',
      gap: theme.spacing(1),
      fontSize: 14,
      lineHeight: '20.02px',
      fontWeight: 400,
      width: 150,
      transition: 'bottom 0.5s ease 0s',
      maxWidth: '100%',
      '&& button': {
        boxShadow: 'none',
      },

      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(2),
      },
    },
    skeleton: {
      width: '100%',
      maxWidth: 140,
      marginTop: theme.spacing(1),
      height: 21,
      transform: 'none',
    },
  }),
);
