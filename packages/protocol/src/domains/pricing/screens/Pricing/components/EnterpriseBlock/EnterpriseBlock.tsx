import { Box, Typography } from '@material-ui/core';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { NavLink } from 'ui';
import { useEnterpriseBlockStyles } from './useEnterpriseBlockStyles';

export const EnterpriseBlock = () => {
  const classes = useEnterpriseBlockStyles();

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
        href="mailto:sales@ankr.com"
        color="primary"
        variant="text"
      >
        {t('plan.enterprise-block.link')}
      </NavLink>
    </Box>
  );
};
