import { ReactNode } from 'react';

import { EndpointPlaceholder } from '../../../EndpointPlaceholder';
import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';
import { useDialog } from 'modules/common/hooks/useDialog';

export interface PlaceholderProps {
  title: ReactNode;
}

export const Placeholder = ({ title }: PlaceholderProps) => {
  const { isOpened, onOpen, onClose } = useDialog();

  return (
    <>
      <EndpointPlaceholder title={title} onClick={onOpen} />
      <PremiumChainDialog open={isOpened} onClose={onClose} />
    </>
  );
};
