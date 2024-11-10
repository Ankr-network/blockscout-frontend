import {
  MaintenanceDialog,
  useMaintenanceDialog,
} from 'modules/layout/components/MaintenanceDialog';

export const MaintenanceDialogContainer = () => {
  const { isOpened, onClose } = useMaintenanceDialog();

  return <MaintenanceDialog isOpened={isOpened} onClose={onClose} />;
};
