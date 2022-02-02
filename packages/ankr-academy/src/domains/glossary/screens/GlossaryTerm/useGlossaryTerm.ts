import { GlossaryRouterConfig } from 'domains/glossary/GlossaryRouterConfig';
import { getTermById } from './GlossaryTermUtils';
import { useGlossaryData } from '../../hooks';

export const useGlossaryTerm = () => {
  const { termId } = GlossaryRouterConfig.glossaryTerm.useParams();
  /* request glossary start */
  const { data: glossaryData, loading } = useGlossaryData();
  /* request glossary end */
  const currentTerm = getTermById(termId, glossaryData);

  return {
    currentTerm,
    glossaryData,
    loading,
  };
};
