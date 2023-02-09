import { useAppSelector } from 'store/useAppSelector';
import { selectHasReminderConfigEmail } from 'domains/auth/store/authSlice';

export const useReminderConfigEmail = () => {
  const hasReminderConfigEmail = useAppSelector(selectHasReminderConfigEmail);

  return {
    hasReminderConfigEmail,
  };
};
