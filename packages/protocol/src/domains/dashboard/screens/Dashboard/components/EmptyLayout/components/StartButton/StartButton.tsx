import { ArrowRightSmall } from '@ankr.com/ui';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { INDEX_PATH } from 'routes/constants';

import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { ENTERPRISE_ROOT_PATH } from 'domains/enterprise/routes';

import { text } from '../../utils/text';
import { useStartButtonStyles } from './StartButtonStyles';

export const StartButton = () => {
  const { classes } = useStartButtonStyles();

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  return (
    <Button
      className={classes.root}
      classes={{
        endIcon: classes.endIcon,
      }}
      component={Link}
      endIcon={<ArrowRightSmall />}
      to={isEnterpriseClient ? ENTERPRISE_ROOT_PATH : INDEX_PATH}
      variant="contained"
    >
      {text('button')}
    </Button>
  );
};
