import { Box, Button, Container, Typography } from '@material-ui/core';
import { PATH_ACCOUNT } from 'domains/account/Routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Spinner, useIsXSDown } from 'ui';
import { H1Tag } from 'uiKit/H1Tag';
import { ReactComponent as DiscordIcon } from 'uiKit/Icons/discord.svg';
import { FeatureBlock } from './components/FeatureBlock';
import { FeatureTable } from './components/FeatureTable';
import { Header } from './components/Header';
import { PurchaseBlock } from './components/PurchaseBlock';
import { usePricingStyles } from './usePricingStyles';

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
          <H1Tag title={t('meta.plan.h1-tag')} />
          <Header isWalletConnected={isWalletConnected} />
          <Container className={classes.container}>
            <Box
              width={isMobile ? '100%' : 960}
              maxWidth="100%"
              display="flex"
              flexDirection="column"
            >
              <Box mt={isMobile ? 7.5 : 12.5}>
                <div className={classes.featureBlock}>
                  <FeatureBlock
                    title={t('plan.features-block.feature1')}
                    fullDescription={t('plan.features-block.feature-full1')}
                  />
                  <FeatureBlock
                    title={t('plan.features-block.feature2')}
                    fullDescription={t('plan.features-block.feature-full2')}
                  />
                  <FeatureBlock
                    title={t('plan.features-block.feature3')}
                    fullDescription={t('plan.features-block.feature-full3')}
                  />
                  <FeatureBlock
                    title={t('plan.features-block.feature4')}
                    fullDescription={t('plan.features-block.feature-full4')}
                  />
                  <FeatureBlock
                    title={t('plan.features-block.feature5')}
                    fullDescription={t('plan.features-block.feature-full5')}
                  />
                  <FeatureBlock
                    title={t('plan.features-block.feature6')}
                    fullDescription={t('plan.features-block.feature-full6')}
                  />
                </div>
              </Box>

              <Box mt={isMobile ? 7.5 : 15}>
                <FeatureTable />
              </Box>

              <Box mt={isMobile ? 7.5 : 15}>
                <PurchaseBlock isWalletConnected={isWalletConnected} />
              </Box>

              <Box mt={isMobile ? 7.5 : 15} className={classes.contactBlock}>
                <Typography className={classes.contactBlockHeader} variant="h3">
                  {t('plan.more-questions')}
                </Typography>
                <Button
                  target="_blank"
                  href="https://discord.com/invite/uYaNu23Ww7"
                  className={classes.contactBlockBtn}
                  startIcon={<DiscordIcon />}
                >
                  {t('plan.contact-discord')}
                </Button>
              </Box>
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
};
