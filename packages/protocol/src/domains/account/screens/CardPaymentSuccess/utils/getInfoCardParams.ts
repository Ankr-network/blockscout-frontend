import { t, tHTML } from '@ankr.com/common';

export const getInfoCardParams = (hasPremium: boolean) => {
  const section = hasPremium ? 'billing' : 'pricing';

  return {
    button: t(`account.card-payment-success.button`),
    description: tHTML(`account.card-payment-success.${section}.description`),
    title: tHTML(`account.card-payment-success.${section}.title`),
  };
};
