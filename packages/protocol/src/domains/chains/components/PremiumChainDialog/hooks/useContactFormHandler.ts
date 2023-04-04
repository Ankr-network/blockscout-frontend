import { useCallback } from 'react';

interface ContactFormHandlerParams {
  onUpgrade?: () => void;
  setContactSales: () => void;
}

export const useContactFormHandler = ({
  onUpgrade = () => {},
  setContactSales,
}: ContactFormHandlerParams) => {
  const contactFormHandler = useCallback(() => {
    onUpgrade();
    setContactSales();
  }, [setContactSales, onUpgrade]);

  return contactFormHandler;
};
