import { Typography, Box, Button } from '@mui/material';

import { t } from '@ankr.com/common';
import { FeatureContent } from '../FeatureContent/FeatureContent';
import { intlRoot } from '../FeatureTable/FeatureTableUtils';
import { useFeatureTableMobileStyles } from './useFeatureTableMobileStyles';
import { LearnMore } from '../LearnMore/LearnMore';
import { PREMIUM_BLOCK_ANCHOR } from '../../PremiumBlock';

export const FeatureTableMobile = () => {
  const { classes } = useFeatureTableMobileStyles();

  return (
    <div>
      <div>
        <Typography variant="h6" className={classes.title}>
          {t(`${intlRoot}.header.column-1`)}
        </Typography>
        <Typography variant="body1" className={classes.plan}>
          {t(`${intlRoot}.header-summary.column-1`)}
        </Typography>
      </div>
      <FeatureContent
        itemIndex={2}
        name="public"
        itemsCount={6}
        button={
          <Button disabled size="small">
            {t(`${intlRoot}.header-button.column-2`)}
          </Button>
        }
      />
      <FeatureContent
        itemIndex={3}
        name="premium"
        itemsCount={11}
        button={
          <Button size="small" href={`#${PREMIUM_BLOCK_ANCHOR}`}>
            {t(`${intlRoot}.header-button.column-3`)}
          </Button>
        }
      />
      <Box className={classes.learnMore}>
        <LearnMore />
      </Box>
    </div>
  );
};
