import { makeStyles } from 'tss-react/mui';

import {
  CHAIN_CARD_GAP,
  CHAIN_CARD_GRID_TEMPLATE_COLUMNS_MOBILE,
  CHAIN_CARD_GRID_TEMPLATE_COLUMNS_PRIVATE,
  CHAIN_CARD_GRID_TEMPLATE_COLUMNS_PUBLIC,
  CHAIN_CARD_PADDING_HORIZONTAL,
} from '../../screens/ChainsListPage/components/BaseChainsCard/useChainCardStyles';

export const useChainListStyles = makeStyles<boolean>()(
  (theme, isPublicLayout) => ({
    rootCardView: {
      display: 'grid',
      alignItems: 'center',
      gap: theme.spacing(4),
      gridTemplateColumns: 'repeat(3, 1fr)',
      [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '1fr',
      },
    },
    rootListView: {
      gap: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.down('xs')]: {
        gap: 0,
        marginLeft: theme.spacing(-4),
        marginRight: theme.spacing(-4),
        backgroundColor: theme.palette.background.paper,
        borderRadius: 11,
      },
    },
    wrapper: {
      height: '100%',
      overflow: 'hidden',

      borderRadius: 18,
      transition: 'box-shadow 0.2s',

      '&:empty': {
        display: 'none',
      },

      '&:hover': {
        boxShadow:
          '0px 0px 15px rgba(31, 34, 38, 0.05), 0px 3px 50px rgba(31, 34, 38, 0.15)',
      },
    },
    skeleton: {
      background: theme.palette.background.paper,
      borderRadius: 18,
      padding: theme.spacing(2 * 2.5),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 200,
      cursor: 'pointer',
    },

    listHeader: {
      display: 'grid',
      gridTemplateColumns: isPublicLayout
        ? CHAIN_CARD_GRID_TEMPLATE_COLUMNS_PUBLIC
        : CHAIN_CARD_GRID_TEMPLATE_COLUMNS_PRIVATE,
      gap: CHAIN_CARD_GAP,
      paddingLeft: CHAIN_CARD_PADDING_HORIZONTAL,
      paddingRight: CHAIN_CARD_PADDING_HORIZONTAL,

      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: CHAIN_CARD_GRID_TEMPLATE_COLUMNS_MOBILE,
      },
      [theme.breakpoints.down('xs')]: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingLeft: 0,
        paddingRight: 0,
      },

      span: {
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
        },
      },
    },
    listHeaderRequestsCol: {
      [theme.breakpoints.down('sm')]: {
        textAlign: 'right',
      },
    },
    tooltipWrapper: {},
    tooltipText: {
      cursor: 'help',
      borderBottom: `1px dashed ${theme.palette.divider}`,
    },
  }),
);
