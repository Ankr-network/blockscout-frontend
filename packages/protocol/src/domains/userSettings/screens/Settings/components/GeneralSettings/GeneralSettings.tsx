import { EmailBlock } from '../EmailBlock';
import { NotificationsBlock } from '../NotificationsBlock';
import { TwoFABlock } from '../TwoFABlock';

export const GeneralSettings = () => {
  return (
    <>
      <EmailBlock />
      <TwoFABlock />
      <NotificationsBlock />
    </>
  );
};
