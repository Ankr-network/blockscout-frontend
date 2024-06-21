import { OverlaySpinner } from '@ankr.com/ui';

import { Placeholder } from 'modules/common/components/Placeholder';

import { ProjectChainDetails } from '../ProjectChainDetails';
import { ProjectChainsTabs } from '../ProjectChainsTabs';
import { useProjectChainsContext } from '../../hooks/useProjectChainsContext';
import { useProjectEndpointsStyles } from './useProjectEndpointsStyles';

export interface ProjectChainsProps {
  className?: string;
}

export const ProjectChains = ({ className }: ProjectChainsProps) => {
  const { isLoading, selectedProjectChainsTabId } = useProjectChainsContext();

  const { classes, cx } = useProjectEndpointsStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Placeholder hasPlaceholder={isLoading} placeholder={<OverlaySpinner />}>
        <ProjectChainsTabs />
        {selectedProjectChainsTabId && <ProjectChainDetails />}
      </Placeholder>
    </div>
  );
};
