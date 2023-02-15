import { ReactNode } from 'react';

import { ChainsItemDialog } from 'domains/chains/components/ChainsItemDialog';
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
      <ChainsItemDialog open={isOpened} onClose={onClose} />
    </>
  );
};
