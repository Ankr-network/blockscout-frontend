import { Box, Button, Container, Typography } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { fetchRates } from 'modules/common/actions/fetchRates';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useEffect, useMemo } from 'react';
import { useIsXSDown } from 'ui';
import { ReactComponent as DiscordIcon } from 'uiKit/Icons/discord.svg';
import { FeatureBlock } from './components/FeatureBlock';
import { FeatureTable } from './components/FeatureTable';
import { Header } from './components/Header';
import { PurchaseBlock } from './components/PurchaseBlock';
import { PREMIUM_COST } from './const';
import { useStyles } from './useStyles';

export const Plan = () => {
  const classes = useStyles();
  const isMobile = useIsXSDown();
  const dispatchRequest = useDispatchRequest();

  useSetBreadcrumbs([
    {
      title: t(PlanRoutesConfig.plan.breadcrumbs),
    },
  ]);

  useEffect(() => {
    dispatchRequest(fetchRates());
  }, [dispatchRequest]);

  const { data: rates } = useQuery({
    type: fetchRates.toString(),
    action: fetchRates,
  });

  const premiumCostInUsd = useMemo(
    () =>
      rates?.ankrUsdt
        ? rates.ankrUsdt.multipliedBy(PREMIUM_COST).toString()
        : undefined,
    [rates?.ankrUsdt],
  );

  return (
    <Box overflow="hidden">
      <Header costInAnkr={PREMIUM_COST} costInUsd={premiumCostInUsd} />

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
            <FeatureTable
              costInAnkr={PREMIUM_COST}
              costInUsd={premiumCostInUsd}
            />
          </Box>

          <Box mt={isMobile ? 7.5 : 15}>
            <PurchaseBlock costInAnkr={PREMIUM_COST} />
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
    </Box>
  );
};
