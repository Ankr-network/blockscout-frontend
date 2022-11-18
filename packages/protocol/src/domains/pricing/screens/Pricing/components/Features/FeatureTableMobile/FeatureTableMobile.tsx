import { Typography, Box, Button } from '@material-ui/core';

import { t } from '@ankr.com/common';
import { FeatureContent } from '../FeatureContent/FeatureContent';
import { intlRoot } from '../FeatureTable/FeatureTableUtils';
import { useFeatureTableMobileStyles } from './useFeatureTableMobileStyles';
import { LearnMore } from '../LearnMore/LearnMore';
import { PREMIUM_BLOCK_ANCHOR } from '../../PremiumBlock';

export const FeatureTableMobile = () => {
  const classes = useFeatureTableMobileStyles();

  return (
    <div className={classes.root}>
      <div className={classes.list}>
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
        num={6}
        button={
          <Button disabled size="small">
            {t(`${intlRoot}.header-button.column-2`)}
          </Button>
        }
      />
      <FeatureContent
        itemIndex={3}
        name="premium"
        num={12}
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
