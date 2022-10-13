import { Box, Container } from '@material-ui/core';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Parallax } from 'react-parallax';

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
import { Features } from './components/Features';

const parallaxStyles = {
  backgroundPosition: 'center bottom',
  top: 90,
  backgroundSize: 'contain',
};

export const Pricing = () => {
  const classes = usePricingStyles();
  const isMobile = useIsXSDown();
  const history = useHistory();
  const { credentials, loading, isWalletConnected } = useAuth();

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
    <Box overflow="hidden">
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <Header />
          <Container className={classes.container}>
            <Plans />
            <EnterpriseBlock />
            <Box
              width={isMobile ? '100%' : 960}
              maxWidth="100%"
              display="flex"
              flexDirection="column"
            >
              <Box mt={isMobile ? 7.5 : 15}>
                <Features />
              </Box>
            </Box>
          </Container>
          <Box mt={isMobile ? 7.5 : 15} className={classes.background}>
            <Parallax bgImage={background} bgImageStyle={parallaxStyles}>
              <Box className={classes.start}>
                <PremiumBlock isWalletConnected={isWalletConnected} />
                <SupportBlock />
              </Box>
            </Parallax>
          </Box>
        </>
      )}
    </Box>
  );
};
