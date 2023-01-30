import { Box } from '@mui/material';
import { ExternalLink } from '@ankr.com/ui';

import { usePlansStyles } from './PlansStyles';
import { Plan } from './Plan';
import {
  basicFeatures,
  basicRoot,
  premiumFeatures,
  premiumLink,
  premiumRoot,
} from './PlansUtils';
import { NavLink } from 'uiKit/NavLink';
import { PREMIUM_BLOCK_ANCHOR } from '../PremiumBlock';
import { PRICING_LINK } from 'domains/account/actions/topUp/const';

export const Plans = () => {
  const { classes } = usePlansStyles();

  return (
    <Box className={classes.root}>
      <Plan root={basicRoot} features={basicFeatures} />
      <Plan
        root={premiumRoot}
        features={premiumFeatures}
        isPremium
        href={`#${PREMIUM_BLOCK_ANCHOR}`}
        link={
          <NavLink
            href={PRICING_LINK}
            variant="text"
            color="inherit"
            className={classes.link}
            endIcon={<ExternalLink />}
          >
            {premiumLink}
          </NavLink>
        }
      />
    </Box>
  );
};
