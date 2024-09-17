import { makeStyles } from 'tss-react/mui';

const name = 'BonusHistorySection';

export const useBonusHistorySectionStyles = makeStyles({ name })(theme => ({
  timePeriodFilter: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
