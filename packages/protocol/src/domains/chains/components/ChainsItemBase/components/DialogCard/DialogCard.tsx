import { ReactNode } from 'react';

import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';
import { useDialog } from 'modules/common/hooks/useDialog';

export interface DialogCardProps {
  children: ReactNode;
  className: string;
}

export const DialogCard = ({ children, className }: DialogCardProps) => {
  const { isOpened, onOpen, onClose } = useDialog();

  return (
    <>
      <div className={className} onClick={onOpen} role="button" tabIndex={0}>
        {children}
      </div>
      <PremiumChainDialog onClose={onClose} open={isOpened} />
    </>
  );
};
