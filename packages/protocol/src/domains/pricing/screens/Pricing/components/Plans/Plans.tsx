import { Box } from '@material-ui/core';

import { ReactComponent as LinkIcon } from 'uiKit/Icons/externalLink.svg';

import { usePlansStyles } from './PlansStyles';
import { Plan } from './Plan';
import {
  basicFeatures,
  basicRoot,
  premiumFeatures,
  premiumLink,
  premiumRoot,
} from './PlansUtils';
import { NavLink } from 'ui';
import { PREMIUM_BLOCK_ANCHOR } from '../PremiumBlock';
import { PRICING_LINK } from 'domains/account/screens/AccountDetails/components/const';

export const Plans = () => {
  const classes = usePlansStyles();

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
            color="default"
            className={classes.link}
            endIcon={<LinkIcon className={classes.icon} />}
          >
            {premiumLink}
          </NavLink>
        }
      />
    </Box>
  );
};
