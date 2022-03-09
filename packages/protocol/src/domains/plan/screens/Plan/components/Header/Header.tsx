import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { ReactComponent as PremiumIcon } from 'uiKit/Icons/premium.svg';
import { useIsMDDown, useIsXSDown } from 'ui';

import MobileHeader from 'assets/img/premium/mobile-fold-header-1.png';
import DeskFoldHeaderLeft from 'assets/img/premium/desk-fold-header-left.png';
import DeskFoldHeaderRight from 'assets/img/premium/desk-fold-header-right.png';

import { useStyles } from './usePlanHeaderStyles';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { Link } from 'react-router-dom';

interface HeaderProps {
  costInAnkr: number;
  costInUsd?: string;
}

export const Header = ({ costInAnkr, costInUsd }: HeaderProps) => {
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
          <Paper className={classes.headerPaper}>
            <Box textAlign="left">
              <Box display="flex" alignItems="center">
                <Box mr={1}>
                  <Typography variant="h5" className={classes.headerPaperTitle}>
                    {t('plan.header.cost', { value: costInAnkr })}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography
                    className={classes.headerPaperTitle2}
                    variant="body1"
                  >
                    ANKR / {t('plan.header.period')}
                  </Typography>
                  <Typography
                    className={classes.headerPaperSubTitle}
                    variant="body1"
                  >
                    {costInUsd && t('plan.cost-usd', { value: costInUsd })}
                    &nbsp;
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Button
              component={Link}
              to={PlanRoutesConfig.planDeposit.generatePath()}
              size="large"
              // onClick={onClickPremiumBtn}
              className={classes.unlockBtn}
              startIcon={<PremiumIcon className={classes.unlockIcon} />}
            >
              <Typography variant="h5" className={classes.unlockBtnTitle}>
                {t('plan.unlock-btn')}
              </Typography>
            </Button>
          </Paper>
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
