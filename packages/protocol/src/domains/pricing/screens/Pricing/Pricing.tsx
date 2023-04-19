import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { Plans } from './components/Plans';
import { usePricingStyles } from './usePricingStyles';
import { Features } from './components/Features';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { INTL_ROOT } from './const';
import { ScalePlans } from './components/ScalePlans';

export const Pricing = () => {
  const { isLightTheme } = useThemes();

  const { classes } = usePricingStyles(isLightTheme);

  useSetBreadcrumbs([
    {
      title: t('plan.breadcrumbs'),
    },
  ]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h3" className={classes.title}>
          {t(`${INTL_ROOT}.breadcrumbs`)}
        </Typography>
        <Plans />
        <Features />
        <ScalePlans />
      </div>
    </div>
  );
};
