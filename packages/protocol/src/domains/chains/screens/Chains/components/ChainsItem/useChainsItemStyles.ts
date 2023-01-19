import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainsItemStyles = makeStyles<boolean, 'copyItem'>()(
  (theme: Theme, isHighlighted: boolean, classes) => ({
    root: {
      background: theme.palette.background.paper,
      borderRadius: 18,
      padding: theme.spacing(2 * 2.5),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      cursor: 'pointer',

      border: isHighlighted
        ? `2px solid ${theme.palette.primary.main}`
        : undefined,

      '&:hover $button': {
        backgroundColor: theme.palette.background.default,
      },
    },
    mainInfo: {
      marginBottom: theme.spacing(2 * 2),
    },
    buttonsWrapper: {
      marginTop: theme.spacing(2 * 1.5),
      display: 'flex',
    },
    buttonAddNetwork: {
      marginRight: theme.spacing(2 * 1),
    },
    button: {
      width: '100%',

      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
    links: {
      width: '100%',

      [`& .${classes.copyItem}:not(:last-child)`]: {
        marginBottom: theme.spacing(2 * 1.5),
      },
    },
    copyItem: {
      boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
    },
    dummy: {
      background: theme.palette.background.default,
      minHeight: 36,
      borderRadius: 6,
      fontSize: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    archive: {
      position: 'absolute',
      top: -2,
      right: 0,

      [theme.breakpoints.between('sm', 850)]: {
        display: 'none',
      },
    },

    premiumOnlyCopyItemContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: theme.palette.background.default,
      padding: theme.spacing(2 * 0.75, 2 * 1.25),
      borderRadius: theme.spacing(2 * 1.5),
    },
    premiumOnlyCopyItemText: {
      display: 'inline',
      fontSize: 12,
      width: 'fit-content',
      background:
        'linear-gradient(269.98deg, #2F62F1 0.02%, #8D30FF 49.89%, #FF7710 99.98%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
    premiumOnlyCopyItemIcon: {
      color: theme.palette.grey[600],
    },
  }),
);
