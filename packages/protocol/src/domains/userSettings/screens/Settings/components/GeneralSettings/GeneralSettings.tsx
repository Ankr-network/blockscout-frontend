import { LoginMethodsBlock } from '../LoginMethodsBlock';
import { NotificationsBlock } from '../NotificationsBlock';
import { ThemeBlock } from '../ThemeBlock';
import { TwoFABlock } from '../TwoFABlock';

export const GeneralSettings = () => {
  return (
    <>
      <LoginMethodsBlock />
      <TwoFABlock />
      <ThemeBlock />
      <NotificationsBlock />
    </>
  );
};
