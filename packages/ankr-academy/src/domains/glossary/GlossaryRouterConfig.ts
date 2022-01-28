import { createRouteConfig } from '../../modules/router/utils/createRouteConfig';
import { generatePath, useParams } from 'react-router-dom';

const PATH_GLOSSARY = '/glossary';
const PATH_GLOSSARY_TERM = '/glossary/:termId';

export const GlossaryRouterConfig = createRouteConfig(
  {
    glossary: {
      path: PATH_GLOSSARY,
      generatePath: () => PATH_GLOSSARY,
    },
    glossaryTerm: {
      path: PATH_GLOSSARY_TERM,
      generatePath: (termId: string) =>
        generatePath(PATH_GLOSSARY_TERM, { termId }),
      useParams: () => {
        const { termId } = useParams<{ termId: string }>();
        return {
          termId,
        };
      },
    },
  },
  PATH_GLOSSARY,
);
