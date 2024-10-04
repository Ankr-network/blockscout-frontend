import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { ChainID, ChainPath } from '@ankr.com/chains-list';

import { ChainsTableColumn } from 'domains/projects/components/ChainsTable';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { ProjectChainItemCellWrapper } from '../../ProjectChainItemColumnWrapper';
import { projectChainsTranslation } from './translation';

export interface UseProjectChainsTableColumnsParams {
  selectedChainPaths: ChainPath[];
  setIsSelectedAll: (isSelectedAll: boolean) => void;
  selectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  unSelectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  setSelectedChainPaths: Dispatch<SetStateAction<ChainPath[]>>;
}

export const useProjectChainsTableColumns = ({
  selectAllSubChainPaths,
  selectedChainPaths,
  setIsSelectedAll,
  setSelectedChainPaths,
  unSelectAllSubChainPaths,
}: UseProjectChainsTableColumnsParams) => {
  const { keys, t } = useTranslation(projectChainsTranslation);

  const headerName = t(keys.selectAll);

  const [expandedId, setExpandedId] = React.useState<ChainID | undefined>(
    undefined,
  );

  return useMemo(
    (): ChainsTableColumn[] => [
      {
        field: 'chain',
        headerName,
        render: ({ chain }) => (
          <ProjectChainItemCellWrapper
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            chain={chain}
            selectedChainPaths={selectedChainPaths}
            setSelectedChainPaths={setSelectedChainPaths}
            setIsSelectedAll={setIsSelectedAll}
            selectAllSubChainPaths={selectAllSubChainPaths}
            unSelectAllSubChainPaths={unSelectAllSubChainPaths}
          />
        ),
        align: 'left',
        width: '100%',
      },
    ],
    [
      headerName,
      expandedId,
      selectedChainPaths,
      setSelectedChainPaths,
      setIsSelectedAll,
      selectAllSubChainPaths,
      unSelectAllSubChainPaths,
    ],
  );
};
