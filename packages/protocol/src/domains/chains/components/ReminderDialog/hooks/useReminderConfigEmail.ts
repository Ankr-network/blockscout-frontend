import { useAppSelector } from 'store/useAppSelector';
import { selectReminderEmailConfig } from 'domains/auth/store/userConfigSlice';

export const useReminderConfigEmail = (address?: string) => {
  const reminderConfigEmail = useAppSelector(selectReminderEmailConfig);

  const hasReminderConfigEmail = Boolean(
    address && reminderConfigEmail[address],
  );

  return {
    hasReminderConfigEmail,
  };
};
