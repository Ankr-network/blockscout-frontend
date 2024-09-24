import { makeStyles } from 'tss-react/mui';

const name = 'BonusPurposeSection';

export const useBonusPurposeSectionStyles = makeStyles({ name })(theme => ({
  timePeriodFilter: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
