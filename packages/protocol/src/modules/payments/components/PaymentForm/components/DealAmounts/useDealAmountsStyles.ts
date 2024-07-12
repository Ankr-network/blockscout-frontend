import { makeStyles } from 'tss-react/mui';
import { chipClasses } from '@mui/material';

export const useDealAmountsStyles = makeStyles()(theme => ({
  dealAmountsRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(5.25),
  },
  dealAmountsFooter: {
    listStyleType: '"•"',
    paddingLeft: theme.spacing(3),
    margin: 0,
  },
  dealBenefitItem: {
    paddingLeft: theme.spacing(2),
  },
  dealAmountLabel: {
    padding: theme.spacing(1, 2),
    [`.${chipClasses.label}`]: {
      padding: theme.spacing(1, 0),
      fontSize: 14,
    },
  },
  contactSalesLink: {
    '&&': {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
}));
