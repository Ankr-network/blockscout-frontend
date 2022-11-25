import { Box, Paper, Typography } from '@material-ui/core';
import { PRICING_LINK } from 'domains/account/screens/AccountDetails/components/const';
import { PremiumLabel } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/PremiumLabel';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { ReactComponent as LinkIcon } from 'uiKit/Icons/externalLink.svg';
import { usePremiumBlockStyles } from './usePremiumBlockStyles';
import { NavLink } from 'ui';
import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { PricingTopUp } from './PricingTopUp';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { shouldShowConnectWalletButton } from './PremiumBlockUtils';

interface PremiumBlockProps {
  hasCredentials: boolean;
  hasOauthLogin?: boolean;
  hasWeb3Connection?: boolean;
  address?: string;
  isUserAddress: boolean;
}

export const PREMIUM_BLOCK_ANCHOR = 'premiumBlock';

export const PremiumBlock = ({
  hasOauthLogin,
  hasWeb3Connection,
  hasCredentials,
  address,
  isUserAddress,
}: PremiumBlockProps) => {
  const classes = usePremiumBlockStyles();

  const { hasConnectButton, isNewWeb3UserWithBindedEmail } =
    shouldShowConnectWalletButton({
      hasOauthLogin,
      hasWeb3Connection,
      hasCredentials,
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
                <PricingTopUp />
              )}
            </Box>
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
