import { Box } from '@mui/material';

import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { PlansDialog } from 'modules/common/components/PlansDialog';

import { ChainSelectList } from '../ChainSelectList';
import { ProjectChain } from '../../hooks/useProjectChains';

interface ChainSelectProps {
  className?: string;
  chain: ProjectChain;
}

export const ChainSelect = ({ chain, className }: ChainSelectProps) => {
  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  return (
    <>
      <Box className={className}>
        <ChainSelectList chain={chain} onOpenDialog={onOpen} />
      </Box>
      <PlansDialog open={isOpened} onClose={onClose} />
    </>
  );
};
