import { isDefaultType } from '../utils/isDefaultType';
import { useTypeFromURL } from './useTypeFromURL';
import { useUpgradePlanDialog } from './useUpgradePlanDialog';

export const useURLBasedUpgradePlanDialog = () => {
  const type = useTypeFromURL();
  const isDefault = isDefaultType(type);

  const { isOpened, onClose, onOpen } = useUpgradePlanDialog({
    isOpened: !isDefault,
    type,
  });

  return { isDefault, isOpened, onClose, onOpen, type };
};
