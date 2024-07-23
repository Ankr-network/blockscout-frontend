import { ReactNode } from 'react';

import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { PlansDialog } from 'modules/common/components/PlansDialog';

export interface DialogCardProps {
  children: ReactNode;
  className: string;
}

export const DialogCard = ({ children, className }: DialogCardProps) => {
  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  return (
    <>
      <div className={className} onClick={onOpen} role="button" tabIndex={0}>
        {children}
      </div>
      <PlansDialog onClose={onClose} open={isOpened} />
    </>
  );
};
