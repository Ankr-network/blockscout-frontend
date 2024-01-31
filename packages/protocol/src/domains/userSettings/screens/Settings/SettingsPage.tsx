import { Box } from '@mui/material';

import { SettingsTabsManager } from './components/SettingsTabs';

export const SettingsPage = () => {
  return (
    <Box position="relative">
      <SettingsTabsManager />
    </Box>
  );
};
