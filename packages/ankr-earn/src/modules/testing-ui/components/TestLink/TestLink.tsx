import { Link } from 'react-router-dom';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { t } from 'common';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { RoutesConfig } from 'modules/testing-ui/Routes';

import { useTestLinkStyles } from './useTestLinkStyles';

/**
 * for testing purpose only
 */
export const TestLink = (): JSX.Element => {
  const classes = useTestLinkStyles();
  const { chainId } = useAuth(AvailableWriteProviders.ethCompatible);

  return (
    <div className={classes.root}>
      <Link
        className={classes.menuLink}
        title="Testing only"
        to={RoutesConfig.main.generatePath()}
      >
        🧪 Test menu
      </Link>

      {chainId && ` | ${t(`chain.${chainId}`)}`}
    </div>
  );
};
