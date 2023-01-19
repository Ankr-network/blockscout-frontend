import { Box, Container } from '@mui/material';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { t } from '@ankr.com/common';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { OverlaySpinner } from '@ankr.com/ui';
import { useIsXSDown } from 'uiKit/Theme/useTheme';
import { EnterpriseBlock } from './components/EnterpriseBlock';
import { Header } from './components/Header';
import { Plans } from './components/Plans';
import { PremiumBlock } from './components/PremiumBlock';
import { usePricingStyles } from './usePricingStyles';
import { SupportBlock } from './components/SupportBlock';
import left from './assets/left.png';
import right from './assets/right.png';
import mobile from './assets/mobile.png';
import { Features } from './components/Features';

export const Pricing = () => {
  const { classes } = usePricingStyles();
  const isMobile = useIsXSDown();
  const {
    hasPrivateAccess,
    loading,
    hasWeb3Connection,
    hasOauthLogin,
    address,
    isUserEthAddressType,
  } = useAuth();

  useSetBreadcrumbs([
    {
      title: t('plan.breadcrumbs'),
    },
  ]);

  return (
    <div className={classes.root}>
      {loading ? (
        <>
          <OverlaySpinner />
        </>
      ) : (
        <div className={classes.content}>
          <Header />
          <Container className={classes.container}>
            <Plans />
            <EnterpriseBlock />
            <Box
              width={isMobile ? '100%' : 1020}
              maxWidth="100%"
              display="flex"
              flexDirection="column"
            >
              <Box mt={isMobile ? 7.5 : 15}>
                <Features />
              </Box>
            </Box>
          </Container>
          <Box mt={isMobile ? 7.5 : 15}>
            <Box
              className={classes.start}
              style={{
                backgroundImage: isMobile ? '' : `url(${left}), url(${right})`,
              }}
            >
              <div>
                <PremiumBlock
                  hasWeb3Connection={hasWeb3Connection}
                  hasOauthLogin={hasOauthLogin}
                  hasPrivateAccess={hasPrivateAccess}
                  address={address}
                  isUserAddress={isUserEthAddressType}
                />
                <SupportBlock />
                {isMobile && <img src={mobile} alt="logos" />}
              </div>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};
