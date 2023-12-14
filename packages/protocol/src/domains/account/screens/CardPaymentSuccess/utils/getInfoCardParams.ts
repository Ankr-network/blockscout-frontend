import { t, tHTML } from '@ankr.com/common';

interface GetInfoCardParamsArguments {
  hasPremium: boolean;
  hasProjectAccess: boolean;
}

export const getInfoCardParams = ({
  hasPremium,
  hasProjectAccess,
}: GetInfoCardParamsArguments) => {
  const sectionName = hasPremium || !hasProjectAccess ? 'billing' : 'pricing';

  return {
    title: tHTML(`account.card-payment-success.${sectionName}.title`),
    description: tHTML(
      `account.card-payment-success.${sectionName}.description`,
    ),
    button: hasProjectAccess
      ? t(`account.card-payment-success.${sectionName}.button`)
      : t('account.card-payment-success.billing-button'),
  };
};
