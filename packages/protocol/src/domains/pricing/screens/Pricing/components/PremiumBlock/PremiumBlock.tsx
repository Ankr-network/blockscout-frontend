import { Box, Paper, Typography } from '@mui/material';

import { PremiumLabel } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/PremiumLabel';
import { t, tHTML } from '@ankr.com/common';
import { ExternalLink } from '@ankr.com/ui';
import { usePremiumBlockStyles } from './usePremiumBlockStyles';
import { NavLink } from 'uiKit/NavLink';
import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { PricingTopUp } from './PricingTopUp';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { shouldShowConnectWalletButton } from './PremiumBlockUtils';
import { PRICING_PLANS_LINK } from 'domains/account/actions/topUp/const';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

interface PremiumBlockProps {
  hasPrivateAccess: boolean;
  hasOauthLogin?: boolean;
  hasWeb3Connection?: boolean;
  address?: string;
  isUserAddress: boolean;
}

export const PREMIUM_BLOCK_ANCHOR = 'premiumBlock';

export const PremiumBlock = ({
  hasOauthLogin,
  hasWeb3Connection,
  hasPrivateAccess,
  address,
  isUserAddress,
}: PremiumBlockProps) => {
  const { isLightTheme } = useThemes();
  const { classes } = usePremiumBlockStyles(isLightTheme);

  const { hasConnectButton, isNewWeb3UserWithBindedEmail } =
    shouldShowConnectWalletButton({
      hasOauthLogin,
      hasWeb3Connection,
      hasPrivateAccess,
      isUserAddress,
    });

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
              {hasConnectButton ? (
                <div className={classes.button}>
                  <ConnectButton
                    variant="contained"
                    buttonText={
                      isNewWeb3UserWithBindedEmail
                        ? t('header.wallet-button-address', {
                            address: shrinkAddress(address),
                          })
                        : undefined
                    }
                  />
                </div>
              ) : (
                <div className={classes.prcingContent}>
                  <PricingTopUp />
                </div>
              )}
            </Box>
            <Typography variant="body2" className={classes.info}>
              {tHTML('plan.premium-block.pricing-info')}
            </Typography>
            <NavLink
              className={classes.link}
              href={PRICING_PLANS_LINK}
              variant="text"
              color="inherit"
              endIcon={<ExternalLink />}
            >
              {t('plan.premium-block.pricing-link')}
            </NavLink>
          </Paper>
        </Box>
      </Box>
    </>
  );
};
