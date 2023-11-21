import { t } from '@ankr.com/common';

import { ChainPath } from 'modules/chains/types';
import { ProjectError } from 'domains/projects/components/ProjectError';
import { Search, useSearch } from 'modules/common/components/Search';

import { ProjectChainsTable } from '../ProjectChainsTable';
import { ProjectSidebarDescription } from '../ProjectSidebarDescription';
import { ProjectSidebarTitle } from '../ProjectSidebarTitle';
import { useAddChainsFormStyles } from './useAddChainsFormStyles';

export interface AddChainsFormProps {
  selectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  unSelectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  selectedChainPaths: ChainPath[];
}

export const AddChainsForm = ({
  selectAllSubChainPaths,
  unSelectAllSubChainPaths,
  selectedChainPaths,
}: AddChainsFormProps) => {
  const { classes } = useAddChainsFormStyles();

  const [searchContent, setSearchContent] = useSearch();

  const hasError = selectedChainPaths.length === 0;

  return (
    <div className={classes.root}>
      <ProjectSidebarTitle className={classes.title}>
        {t('project.add-chains-form.title')}
      </ProjectSidebarTitle>
      <ProjectSidebarDescription className={classes.description}>
        {t('project.add-chains-form.description')}
      </ProjectSidebarDescription>
      <Search
        searchContent={searchContent}
        className={classes.search}
        rootClassName={classes.searchRoot}
        setSearchContent={setSearchContent}
      />
      {hasError && (
        <ProjectError>{t('project.add-chains-form.error')}</ProjectError>
      )}
      <ProjectChainsTable
        selectAllSubChainPaths={selectAllSubChainPaths}
        unSelectAllSubChainPaths={unSelectAllSubChainPaths}
        searchContent={searchContent}
        selectedChainPaths={selectedChainPaths}
      />
    </div>
  );
};
