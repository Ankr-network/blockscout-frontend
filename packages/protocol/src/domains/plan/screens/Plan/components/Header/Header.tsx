import { Box, Container, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { ReactComponent as PremiumIcon } from 'uiKit/Icons/premium.svg';
import { useIsMDDown, useIsXSDown, NavLink } from 'ui';

import MobileHeader from 'assets/img/premium/mobile-fold-header-1.png';
import DeskFoldHeaderLeft from 'assets/img/premium/desk-fold-header-left.png';
import DeskFoldHeaderRight from 'assets/img/premium/desk-fold-header-right.png';
import { useStyles } from './usePlanHeaderStyles';
import { CONTACT_SALES_LINK } from '../../const';

export const Header = () => {
  const classes = useStyles();
  const isMobile = useIsXSDown();
  const isTablet = useIsMDDown();

  return (
    <Box display="flex" justifyContent={isTablet ? 'center' : 'space-between'}>
      {!isMobile && !isTablet && (
        <Box
          position="relative"
          flex="1"
          display="flex"
          justifyContent="center"
          mr={20}
        >
          <img
            className={classes.headerLeftImg}
            width="100%"
            alt=""
            src={DeskFoldHeaderLeft}
          />
        </Box>
      )}
      <Box className={classes.centerBlock}>
        {isMobile && (
          <img
            className={classes.mobileHeaderImg}
            width="100%"
            alt=""
            src={MobileHeader}
          />
        )}
        <Container disableGutters={!isMobile}>
          <Typography className={classes.headerTitle} variant="h3">
            {t('plan.header.title')}
          </Typography>
          <Typography className={classes.headerSubTitle} variant="body1">
            {t('plan.header.sub-title')}
          </Typography>
          <NavLink
            href={CONTACT_SALES_LINK}
            tabIndex={0}
            size="large"
            className={classes.unlockBtn}
            startIcon={<PremiumIcon className={classes.unlockIcon} />}
            variant="contained"
          >
            <Typography variant="h5" className={classes.unlockBtnTitle}>
              {t('plan.unlock-btn')}
            </Typography>
          </NavLink>
          <Typography
            align="center"
            variant="subtitle1"
            className={classes.headerSubTitle2}
          >
            {t('plan.header.sub-title2')}
          </Typography>
        </Container>
      </Box>
      {!isMobile && !isTablet && (
        <Box
          ml={20}
          position="relative"
          display="flex"
          justifyContent="center"
          flex="1"
        >
          <img
            className={classes.headerRightImg}
            width="100%"
            alt=""
            src={DeskFoldHeaderRight}
          />
        </Box>
      )}
    </Box>
  );
};
