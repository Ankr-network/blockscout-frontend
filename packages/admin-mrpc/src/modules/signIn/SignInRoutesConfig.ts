import { createRouteConfig } from '@ankr.com/utils';

const PATH_SIGN_IN = '/signin';

export const SignInRoutesConfig = createRouteConfig(
  {
    signIn: {
      path: PATH_SIGN_IN,
      generatePath: () => PATH_SIGN_IN,
    },
  },

  PATH_SIGN_IN,
);
