import { makeStyles } from 'tss-react/mui';

import { DIALOG_BREAKDOWN } from '../../const';
import { getPremiumColorGradient } from 'uiKit/Theme/themeUtils';

export const useDefaultContentStyles = makeStyles<boolean>()(
  (theme, isLightTheme) => ({
    dialogTitle: {
      textAlign: 'center',
      margin: theme.spacing(0, 0, 2 * 5.75, 0),
      fontSize: 35,
    },
    wrapperHighlighted: {
      background: getPremiumColorGradient(theme),
      padding: '4px',
      borderRadius: '42px',
    },
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      columnGap: theme.spacing(2 * 3.5),
      rowGap: theme.spacing(2 * 3.5),
      minHeight: 470,

      [theme.breakpoints.down(DIALOG_BREAKDOWN)]: {
        gridAutoFlow: 'row',
        gridTemplateColumns: 'auto',
      },
    },
    content: {
      padding: theme.spacing(6),
      border: `4px solid ${theme.palette.divider}`,
      borderRadius: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    contentHighlighted: {
      borderColor: 'transparent',
    },
    title: {
      marginBottom: theme.spacing(3.5),
    },
    intro: {
      fontSize: 12,
      fontWeight: 500,
      marginBottom: theme.spacing(4.5),
      color: theme.palette.grey[800],
      lineHeight: '14.52px',
      display: 'block',
      '& em': {
        fontStyle: 'normal',
        fontSize: 18,
        fontWeight: 700,
        lineHeight: '21.78px',
      },
    },
    description: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '20.02px',
      display: 'block',
    },
    list: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '22.82px',
      marginTop: theme.spacing(4.5),
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      color: theme.palette.grey[900],
    },
    check: {
      color: theme.palette.grey[500],
      width: 18,
      height: 18,
      marginRight: theme.spacing(1),
    },
    button: {
      marginTop: theme.spacing(2 * 2),
      '&:hover': {
        color: isLightTheme
          ? theme.palette.text.secondary
          : theme.palette.text.primary,
      },
    },
  }),
);
