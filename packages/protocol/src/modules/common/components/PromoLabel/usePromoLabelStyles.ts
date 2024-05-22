import { makeStyles } from 'tss-react/mui';

import { premiumGradient } from 'uiKit/Theme/themeUtils';

export const usePromoLabelStyles = makeStyles()(theme => ({
  promoLabelRoot: {
    padding: theme.spacing(0, 2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    lineHeight: 1.4,
    transition: 'background-color 0.3s',
  },
  promoLabel: {
    background: premiumGradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));
