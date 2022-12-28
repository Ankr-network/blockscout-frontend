import { Box, Container } from '@material-ui/core';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { Spinner, useIsXSDown } from 'ui';
import { EnterpriseBlock } from './components/EnterpriseBlock';
import { Header } from './components/Header';
import { Plans } from './components/Plans';
import { PremiumBlock } from './components/PremiumBlock';
import { usePricingStyles } from './usePricingStyles';
import { SupportBlock } from './components/SupportBlock';
import background from './assets/background.png';
import mobile from './assets/mobile.png';
import { Features } from './components/Features';

export const Pricing = () => {
  const classes = usePricingStyles();
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
          <Spinner />
        </>
      ) : (
        <>
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
          </div>
          <Box mt={isMobile ? 7.5 : 15} className={classes.background}>
            <Box
              className={classes.start}
              style={{ backgroundImage: isMobile ? '' : `url(${background})` }}
            >
              <PremiumBlock
                hasWeb3Connection={hasWeb3Connection}
                hasOauthLogin={hasOauthLogin}
                hasPrivateAccess={hasPrivateAccess}
                address={address}
                isUserAddress={isUserEthAddressType}
              />
              <SupportBlock />
              {isMobile && <img src={mobile} alt="logos" />}
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};
