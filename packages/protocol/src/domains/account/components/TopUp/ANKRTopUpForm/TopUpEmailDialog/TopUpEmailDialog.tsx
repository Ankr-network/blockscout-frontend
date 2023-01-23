import { Box, Typography } from '@mui/material';

import { tHTML } from '@ankr.com/common';
import { AddEmailBannerDialog } from 'domains/userSettings/components/AddEmailBanner';
import { EmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { useEmailBannerProps } from 'domains/userSettings/screens/Settings/SettingsUtils';

interface TopUpEmailDialogProps {
  dialogProps: {
    isOpened: boolean;
    onClose: () => void;
  };
  emailDataProps: EmailData;
}

export const TopUpEmailDialog = ({
  dialogProps,
  emailDataProps,
}: TopUpEmailDialogProps) => {
  const bannerProps = useEmailBannerProps(emailDataProps);

  if (!bannerProps) return null;

  return (
    <AddEmailBannerDialog
      {...dialogProps}
      fillStepContent={
        <Box mb={3.5}>
          <Typography variant="body2">{tHTML('plan.email-content')}</Typography>
        </Box>
      }
      {...bannerProps}
    />
  );
};
