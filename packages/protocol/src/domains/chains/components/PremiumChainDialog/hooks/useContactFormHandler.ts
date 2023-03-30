import { useCallback } from 'react';

interface ContactFormHandlerParams {
  onTrack?: () => void;
  setContactSales: () => void;
}

export const useContactFormHandler = ({
  onTrack = () => {},
  setContactSales,
}: ContactFormHandlerParams) => {
  const contactFormHandler = useCallback(() => {
    onTrack();
    setContactSales();
  }, [setContactSales, onTrack]);

  return contactFormHandler;
};
