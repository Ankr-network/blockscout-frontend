import { Box, Typography } from '@mui/material';

import { t, tHTML } from '@ankr.com/common';
import { NavLink } from 'uiKit/NavLink';
import { useEnterpriseBlockStyles } from './useEnterpriseBlockStyles';
import { MAIL_TO_SALES } from 'domains/pricing/Routes';

export const EnterpriseBlock = () => {
  const { classes } = useEnterpriseBlockStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography
          className={classes.label}
          variant="h4"
          color="textSecondary"
        >
          {tHTML('plan.enterprise-block.label')}
        </Typography>
        <Typography variant="h3" className={classes.title}>
          {tHTML('plan.enterprise-block.title')}
        </Typography>
      </Box>
      <NavLink
        className={classes.link}
        href={MAIL_TO_SALES}
        color="primary"
        variant="text"
      >
        {t('plan.enterprise-block.link')}
      </NavLink>
    </Box>
  );
};
