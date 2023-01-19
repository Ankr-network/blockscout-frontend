import { Box } from '@mui/material';
import { useHistory } from 'react-router';

import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { OverlaySpinner } from '@ankr.com/ui';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import {
  EmptyObject,
  useLazyOauthLoginByGoogleSecretCodeQuery,
} from 'domains/oauth/actions/loginByGoogleSecretCode';
import { useOauthStyles } from './useOauthStyles';

export const OauthQuery = () => {
  const [loginUser, state] = useLazyOauthLoginByGoogleSecretCodeQuery();
  const history = useHistory();
  const { classes } = useOauthStyles();

  useOnMount(() => {
    const login = async () => {
      const { error } = await loginUser();

      if (!error) {
        history.push(ChainsRoutesConfig.chains.generatePath());
      }
    };

    login();
  });

  return (
    <Box className={classes.root}>
      <Queries<EmptyObject> empty={<OverlaySpinner />} queryStates={[state]}>
        {() => <OverlaySpinner />}
      </Queries>
    </Box>
  );
};
