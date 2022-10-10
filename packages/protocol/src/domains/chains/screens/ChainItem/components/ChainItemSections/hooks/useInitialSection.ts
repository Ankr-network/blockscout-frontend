import { QUERY_NAME } from '../const';
import { SectionID } from '../types';
import { Tab } from 'modules/common/hooks/useTabs';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';

export const useInitialSection = (tabs: Tab<SectionID>[]) => {
  const params = useQueryParams();

  const sectionId = params.get(QUERY_NAME) as SectionID;

  return tabs.find(({ id }) => sectionId === id)?.id || tabs[0].id;
};
