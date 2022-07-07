import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { RoutesConfig } from 'modules/testing-ui/Routes';

import { useTestLinkStyles } from './useTestLinkStyles';

/**
 * for testing purpose only
 */
export const TestLink = (): JSX.Element => {
  const classes = useTestLinkStyles();
  return (
    <Box position="relative">
      <div className={classes.root}>
        <Link
          className={classes.menuLink}
          title="Testing only"
          to={RoutesConfig.main.generatePath()}
        >
          🧪 Test menu
        </Link>
      </div>
    </Box>
  );
};
