import { createRouteConfig } from '../../modules/router/utils/createRouteConfig';

const PATH_GLOSSARY = '/glossary';

export const GlossaryRouterConfig = createRouteConfig(
  {
    glossary: {
      path: PATH_GLOSSARY,
      generatePath: () => PATH_GLOSSARY,
    },
  },
  PATH_GLOSSARY,
);
