import { Chain } from 'modules/chains/types';
import {
  selectBlockchains,
  selectBlockchainsLoadingStatus,
} from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { getAddIsArchiveCB } from 'modules/chains/utils/addIsArchive';
import { useChainsFetchChainNodesDetailQuery } from 'modules/chains/actions/fetchChainNodesDetail';
import { ACTION_TEN_MINUTES_CACHE } from 'modules/common/constants/const';
import { MultiService } from 'modules/api/MultiService';
import { formatChainsConfigToChains } from 'domains/chains/utils/formatChainsConfigToChains';

export type PublicChains = [Chain[], boolean];

export const usePublicChainsInfo = (): PublicChains => {
  const service = MultiService.getService();

  const { data: nodes = [], isLoading: isNodeLoading } =
    useChainsFetchChainNodesDetailQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_TEN_MINUTES_CACHE,
    });

  const { data: chainss = [] } = useAppSelector(selectBlockchains);

  const formattedPublicChains = service.formatPublicEndpoints(chainss);

  const chains = formatChainsConfigToChains(formattedPublicChains);
  const isLoading = useAppSelector(selectBlockchainsLoadingStatus);

  const addIsArchive = getAddIsArchiveCB(nodes);

  return [chains.map(addIsArchive), isLoading || isNodeLoading];
};
