import { QUERY_NAME } from '../const';
import { SectionID } from '../types';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';

const { GetStarted, Infrastructure, UsageData } = SectionID;
const sections = [GetStarted, Infrastructure, UsageData];

export const useInitialSection = () => {
  const params = useQueryParams();

  const sectionId = params.get(QUERY_NAME) as SectionID;
  const isSectionCorrect = sections.includes(sectionId);

  if (isSectionCorrect) return sectionId;

  return SectionID.GetStarted;
};
