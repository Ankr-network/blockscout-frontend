import { Box } from '@mui/material';

import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

import { ChainSelectList } from '../ChainSelectList';
import { ProjectChain } from '../../hooks/useProjectChains';

interface ChainSelectProps {
  className?: string;
  chain: ProjectChain;
}

export const ChainSelect = ({ chain, className }: ChainSelectProps) => {
  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

  return (
    <>
      <Box className={className}>
        <ChainSelectList chain={chain} onOpenDialog={onOpen} />
      </Box>
      <UpgradePlanDialog open={isOpened} onClose={onClose} />
    </>
  );
};
