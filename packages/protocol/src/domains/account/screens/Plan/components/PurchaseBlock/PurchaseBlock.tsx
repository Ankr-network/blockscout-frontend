import { Box, Paper, Typography } from '@material-ui/core';

import { useStyles } from './usePurchaseBlockStyles';
import { ReactComponent as CheckIcon } from 'uiKit/Icons/check.svg';
import { ReactComponent as PremiumIcon } from 'uiKit/Icons/premium.svg';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { NavLink, useIsXSDown } from 'ui';
import { CONTACT_SALES_LINK } from '../../const';

export const PurchaseBlock = () => {
  const classes = useStyles();
  const isMobile = useIsXSDown();

  return (
    <Paper className={classes.root}>
      {isMobile && <div className={classes.mobileHeaderImg} />}
      <Box className={classes.centerBlock}>
        <Typography variant="h3" className={classes.title}>
          {tHTML('plan.purchase-block.title')}
        </Typography>
        <Typography variant="body1" className={classes.subTitle}>
          {t('plan.purchase-block.sub-title')}
        </Typography>

        <Box mt={2.5} display="flex" justifyContent="center">
          <Box className={classes.featureContainer}>
            <Box display="flex" alignItems="center">
              <CheckIcon fontSize={24} className={classes.iconPrimary} />
              <Typography className={classes.featureText}>
                {t('plan.purchase-block.feature1')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <CheckIcon fontSize={24} className={classes.iconPrimary} />
              <Typography className={classes.featureText}>
                {t('plan.purchase-block.feature2')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <CheckIcon fontSize={24} className={classes.iconPrimary} />
              <Typography className={classes.featureText}>
                {t('plan.purchase-block.feature3')}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.unlockContainer}>
          <NavLink
            href={CONTACT_SALES_LINK}
            tabIndex={0}
            size="large"
            className={classes.unlockBtn}
            startIcon={<PremiumIcon />}
            variant="contained"
          >
            <Typography variant="h5" className={classes.unlockBtnTitle}>
              {t('plan.unlock-btn')}
            </Typography>
          </NavLink>
        </Box>
      </Box>
      {isMobile && <div className={classes.mobileFooterImg} />}
      {!isMobile && (
        <>
          <div className={classes.imgLeft} />
          <div className={classes.imgRight} />
        </>
      )}
    </Paper>
  );
};
