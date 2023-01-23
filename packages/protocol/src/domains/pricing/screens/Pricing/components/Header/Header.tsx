import { Box, Container, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useIsXSDown } from 'uiKit/Theme/useTheme';

import { useStyles } from './usePlanHeaderStyles';

export const Header = () => {
  const { classes } = useStyles();
  const isMobile = useIsXSDown();

  return (
    <Box display="flex" justifyContent="center">
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
