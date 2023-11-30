import { ProjectSidebar } from '../ProjectSidebar';
import {
  UseConfigureWhitelistFormParams,
  useConfigureWhitelistForm,
} from './hooks/useConfigureWhitelistForm';

export interface ConfigureWhitelistFormProps
  extends UseConfigureWhitelistFormParams {}

export const ConfigureWhitelistForm = ({
  isOpened,
  onClose,
}: ConfigureWhitelistFormProps) => {
  const sidebarProps = useConfigureWhitelistForm({ isOpened, onClose });

  return <ProjectSidebar {...sidebarProps} />;
};
