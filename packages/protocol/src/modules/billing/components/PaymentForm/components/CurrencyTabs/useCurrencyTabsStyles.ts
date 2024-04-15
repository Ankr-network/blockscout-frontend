import { makeStyles } from 'tss-react/mui';

export const useCurrencyTabsStyles = makeStyles()(theme => ({
  currencyTabsRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  tabs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: 17,

    background: theme.palette.background.default,
  },
  tab: {
    width: '100%',
  },
  tabsContainer: {
    width: '100%',
  },
}));
