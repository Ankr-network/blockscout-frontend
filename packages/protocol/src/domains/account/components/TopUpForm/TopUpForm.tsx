import { Box } from '@mui/material';

import { TabsManager } from 'uiKit/TabsManager';

import { Header } from './components/Header';
import { TopUpEmailDialog } from './components/TopUpEmailDialog';
import { useEmailDialog } from './hooks/useEmailDialog';
import { useTopUpForm } from './hooks/useTopUpForm';
import { useTopUpFormStyles } from './TopUpFormStyles';

export interface TopUpFormProps {
  className?: string;
}

export const TopUpForm = ({ className }: TopUpFormProps) => {
  const { dialogProps, emailData, handleOpenEmailDialog, hasEmailBound } =
    useEmailDialog();

  const { selectedTab, tabs, usdPaymentOnly } = useTopUpForm({
    handleOpenEmailDialog,
    hasEmailBound,
  });

  const { classes, cx } = useTopUpFormStyles(usdPaymentOnly);

  return (
    <Box className={cx(classes.root, className)}>
      <Header />
      <TabsManager
        allowSingleTab={false}
        className={classes.tabs}
        selectedTab={selectedTab}
        tabs={tabs}
      />
      <TopUpEmailDialog dialogProps={dialogProps} emailDataProps={emailData} />
    </Box>
  );
};
