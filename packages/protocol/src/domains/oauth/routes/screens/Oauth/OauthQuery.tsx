import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useHistory } from 'react-router';

import { loginUser } from 'domains/oauth/actions/loginUserByGoogleSecretCode';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { Spinner } from 'ui';
import { useRedirectIfUserHasEmail } from './OauthUtils';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useOauthStyles } from './useOauthStyles';

type LoginUserResponseData = ResponseData<typeof loginUser>;

export const OauthQuery = () => {
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();
  const classes = useOauthStyles();

  useRedirectIfUserHasEmail();

  useOnMount(() => {
    const login = async () => {
      const { error } = await dispatchRequest(loginUser());

      if (!error) {
        history.push(ChainsRoutesConfig.chains.generatePath());
      }
    };

    login();
  });

  return (
    <Box className={classes.root}>
      <Queries<LoginUserResponseData>
        requestActions={[loginUser]}
        empty={<Spinner />}
      >
        {() => <Spinner />}
      </Queries>
    </Box>
  );
};
