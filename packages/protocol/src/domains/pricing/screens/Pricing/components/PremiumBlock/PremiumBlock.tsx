import { Box, Paper, Typography } from '@material-ui/core';

import { PRICING_LINK } from 'domains/account/screens/AccountDetails/components/const';
import { PremiumLabel } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/PremiumLabel';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { ReactComponent as LinkIcon } from 'uiKit/Icons/externalLink.svg';
import { usePremiumBlockStyles } from './usePremiumBlockStyles';
import { NavLink } from 'ui';
import ANKRIcon from './assets/ankr.svg';
import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { PricingTopUp } from './PricingTopUp';

interface PremiumBlockProps {
  isWalletConnected?: boolean;
}

export const PREMIUM_BLOCK_ANCHOR = 'premiumBlock';

export const PremiumBlock = ({ isWalletConnected }: PremiumBlockProps) => {
  const classes = usePremiumBlockStyles();

  return (
    <>
      <Typography
        className={classes.blockTitle}
        variant="h3"
        id={PREMIUM_BLOCK_ANCHOR}
      >
        {tHTML('plan.premium-block.block-title')}
      </Typography>
      <Box className={classes.wrapper}>
        <Box className={classes.container}>
          <Paper className={classes.root}>
            <PremiumLabel size="m" />
            <Typography variant="h3" className={classes.title}>
              {tHTML('plan.premium-block.title')}
            </Typography>
            <Box className={classes.form}>
              {isWalletConnected ? (
                <PricingTopUp />
              ) : (
                <ConnectButton variant="contained" />
              )}
            </Box>
            {isWalletConnected && (
              <Typography className={classes.pricing} variant="body2">
                {tHTML(`plan.premium-block.pricing`, {
                  src: ANKRIcon,
                  alt: t('plan.premium-block.ankr'),
                })}
              </Typography>
            )}
            <Typography variant="body2" className={classes.info}>
              {tHTML('plan.premium-block.pricing-info')}
            </Typography>
            <NavLink
              className={classes.link}
              href={PRICING_LINK}
              variant="text"
              color="inherit"
              endIcon={<LinkIcon className={classes.icon} />}
            >
              {t('plan.premium-block.pricing-link')}
            </NavLink>
          </Paper>
        </Box>
      </Box>
    </>
  );
};
