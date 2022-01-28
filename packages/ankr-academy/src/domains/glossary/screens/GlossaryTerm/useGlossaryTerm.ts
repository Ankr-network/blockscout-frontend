import { GlossaryRouterConfig } from 'domains/glossary/GlossaryRouterConfig';
import { getTermById } from './GlossaryTermUtils';

export const useGlossaryTerm = () => {
  const { termId } = GlossaryRouterConfig.glossaryTerm.useParams();
  const currentTerm = getTermById(termId);

  return {
    currentTerm,
  };
};
