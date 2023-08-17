import { Box } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';

import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import {
  EmptyObject,
  LoginBySecretCodeResult,
  useLazyOauthLoginByGoogleSecretCodeQuery,
} from 'domains/oauth/actions/loginByGoogleSecretCode';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useLazyOauthLoginInitiatorQuery } from 'domains/oauth/actions/loginByGoogleSecretCode/loginInitiator';
import { useLazyOauthLoginJwtQuery } from 'domains/oauth/actions/loginByGoogleSecretCode/oauthLoginJwt';

import { useOauthStyles } from './useOauthStyles';

export const OauthQuery = () => {
  const [, loginByGoogleSecretCodeState] =
    useLazyOauthLoginByGoogleSecretCodeQuery();
  const [, oauthLoginJwtState] = useLazyOauthLoginJwtQuery();

  const [loginUser] = useLazyOauthLoginInitiatorQuery();

  const { classes } = useOauthStyles();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useOnMount(() => {
    loginUser({ params: { group } });
  });

  return (
    <Box className={classes.root}>
      <Queries<LoginBySecretCodeResult, EmptyObject>
        empty={<OverlaySpinner />}
        queryStates={[loginByGoogleSecretCodeState, oauthLoginJwtState]}
      >
        {() => <OverlaySpinner />}
      </Queries>
    </Box>
  );
};
