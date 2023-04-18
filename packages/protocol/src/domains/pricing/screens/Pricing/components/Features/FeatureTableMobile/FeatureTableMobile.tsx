import { Typography } from '@mui/material';

import { t } from '@ankr.com/common';
import { FeatureContent } from '../FeatureContent/FeatureContent';
import {
  PLAN_COMPARISON,
  INTL_PLAN_COMPARISON_ROOT,
} from '../FeatureTable/FeatureTableUtils';
import { useFeatureTableMobileStyles } from './useFeatureTableMobileStyles';

export const FeatureTableMobile = () => {
  const { classes } = useFeatureTableMobileStyles();

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        {t(`${INTL_PLAN_COMPARISON_ROOT}.title`)}
      </Typography>
      <div className={classes.content}>
        {PLAN_COMPARISON.map((name, rowIndex) => (
          <FeatureContent
            key={`column-${rowIndex + 1}`}
            name={name}
            itemIndex={rowIndex}
          />
        ))}
      </div>
    </div>
  );
};
