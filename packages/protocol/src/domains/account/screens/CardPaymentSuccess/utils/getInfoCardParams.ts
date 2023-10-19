import { t, tHTML } from '@ankr.com/common';

interface GetInfoCardParamsArguments {
  hasPremium: boolean;
}

export const getInfoCardParams = ({
  hasPremium,
}: GetInfoCardParamsArguments) => {
  const sectionName = hasPremium ? 'billing' : 'pricing';

  return {
    title: tHTML(`account.card-payment-success.${sectionName}.title`),
    description: tHTML(
      `account.card-payment-success.${sectionName}.description`,
    ),
    button: t(`account.card-payment-success.${sectionName}.button`),
  };
};
