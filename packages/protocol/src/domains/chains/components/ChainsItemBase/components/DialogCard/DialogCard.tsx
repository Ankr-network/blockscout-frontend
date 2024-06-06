import { ReactNode } from 'react';

import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

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
      <UpgradePlanDialog onClose={onClose} open={isOpened} />
    </>
  );
};
