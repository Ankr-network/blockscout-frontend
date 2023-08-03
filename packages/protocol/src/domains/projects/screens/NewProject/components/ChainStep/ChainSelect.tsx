import { Box } from '@mui/material';

import { Chain } from 'domains/chains/types';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

import { ChainSelectList } from '../ChainSelectList';

interface ChainSelectProps {
  className?: string;
  chain: Chain;
}

export const ChainSelect = ({
  chain: { id: chainId },
  className,
}: ChainSelectProps) => {
  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

  return (
    <>
      <Box className={className}>
        <ChainSelectList chainId={chainId} onOpenDialog={onOpen} />
      </Box>
      <UpgradePlanDialog open={isOpened} onClose={onClose} />
    </>
  );
};
