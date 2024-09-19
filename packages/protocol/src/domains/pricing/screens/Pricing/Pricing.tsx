import { Typography } from '@mui/material';

import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { Plans } from './components/Plans';
import { usePricingStyles } from './usePricingStyles';
import { Features } from './components/Features';
import { ScalePlans } from './components/ScalePlans';
import { pricingTranslation } from './translation';

export const Pricing = () => {
  const { isLightTheme } = useThemes();

  const { classes } = usePricingStyles(isLightTheme);

  const { keys, t } = useTranslation(pricingTranslation);

  useSetBreadcrumbs([
    {
      title: t(keys.breadcrumbs),
    },
  ]);

  useRedirectToEnterpriseOnGroupChange();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h3" className={classes.title}>
          {t(keys.title)}
        </Typography>
        <Plans />
        <Features />
        <ScalePlans />
      </div>
    </div>
  );
};
