import { ReactNode } from 'react';

import { EndpointPlaceholder } from '../../../EndpointPlaceholder';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

export interface PlaceholderProps {
  title: ReactNode;
}

export const Placeholder = ({ title }: PlaceholderProps) => {
  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

  return (
    <>
      <EndpointPlaceholder title={title} onClick={onOpen} />
      <UpgradePlanDialog open={isOpened} onClose={onClose} />
    </>
  );
};
