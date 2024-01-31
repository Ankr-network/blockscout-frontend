import { EmailBlock } from '../EmailBlock';
import { NotificationsBlock } from '../NotificationsBlock';
import { ThemeBlock } from '../ThemeBlock';
import { TwoFABlock } from '../TwoFABlock';

export const GeneralSettings = () => {
  return (
    <>
      <EmailBlock />
      <TwoFABlock />
      <ThemeBlock />
      <NotificationsBlock />
    </>
  );
};
