import { Box, Container, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { useIsXSDown } from 'ui';

import { useStyles } from './usePlanHeaderStyles';

export const Header = () => {
  const classes = useStyles();
  const isMobile = useIsXSDown();

  return (
    <Box display="flex" justifyContent="center" className={classes.root}>
      <Box className={classes.centerBlock}>
        <Container disableGutters={!isMobile}>
          <Typography
            className={classes.subTitle}
            variant="body1"
            color="primary"
          >
            {t('plan.header.sub-title')}
          </Typography>
          <Typography className={classes.headerTitle} variant="h3">
            {t('plan.header.title')}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
