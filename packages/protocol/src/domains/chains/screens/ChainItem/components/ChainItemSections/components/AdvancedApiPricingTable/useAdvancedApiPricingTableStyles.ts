import { makeStyles } from 'tss-react/mui';

import { getLinkStyles } from '../AdvancedApiInfoTabs/useAdvancedApiInfoTabsStyles';

export const useAdvancedApiPricingTableStyles = makeStyles()(theme => ({
  pricingTable: {
    borderSpacing: 0,
  },
  pricingTableHeader: {
    borderRadius: 0,
  },
  pricingTableCell: {
    backgroundColor: 'transparent',
    fontWeight: 400,
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.divider}`,

    '&&': {
      borderRadius: 0,
    },

    '&:first-of-type': {
      paddingLeft: 0,
    },
  },
  pricingLink: getLinkStyles(theme),
}));
