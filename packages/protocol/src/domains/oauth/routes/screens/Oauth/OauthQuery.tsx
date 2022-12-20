import { Box } from '@material-ui/core';
import { Spinner } from 'ui';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useLazyOauthLoginByGoogleSecretCodeQuery } from 'domains/oauth/actions/loginByGoogleSecretCode';
import { useOauthStyles } from './useOauthStyles';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useRedirectIfUserHasEmail } from './OauthUtils';

export const OauthQuery = () => {
  const [loginUser] = useLazyOauthLoginByGoogleSecretCodeQuery();
  const history = useHistory();
  const classes = useOauthStyles();

  useRedirectIfUserHasEmail();

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
      <Queries empty={<Spinner />} queryStates={[]}>
        {() => <Spinner />}
      </Queries>
    </Box>
  );
};
