import { Box, Container } from '@material-ui/core';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { PATH_ACCOUNT } from 'domains/account/Routes';
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
import { EthAddressType } from 'multirpc-sdk';

export const Pricing = () => {
  const classes = usePricingStyles();
  const isMobile = useIsXSDown();
  const history = useHistory();
  const {
    credentials,
    loading,
    isWalletConnected,
    hasWeb3Connection,
    hasOauthLogin,
    address,
    ethAddressType,
  } = useAuth();

  useEffect(() => {
    if (credentials || (isWalletConnected && history.action === 'REPLACE')) {
      history.replace(PATH_ACCOUNT);
    }
  }, [history, credentials, isWalletConnected]);

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
                hasCredentials={Boolean(credentials)}
                address={address}
                isUserAddress={ethAddressType === EthAddressType.User}
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
