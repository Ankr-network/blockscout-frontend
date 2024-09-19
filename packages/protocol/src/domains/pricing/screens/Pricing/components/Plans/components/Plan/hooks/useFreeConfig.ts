import { Briefcase, Dashboard, Question, ShieldUnsafe } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { plansTranslation } from '../../../plansTranslation';
import { ReactComponent as Blockchain } from '../../../assets/blockchain.svg';

export const useFreeConfig = () => {
  const { keys, t, tHTML } = useTranslation(plansTranslation);

  return {
    title1: t(keys.freemium.title),
    title2: t(keys.freemium.subtitle),
    price: tHTML(keys.freemium.price),
    label: t(keys.freemium.label),
    isPremium: false,
    actionText: t(keys.freemium.button),
    isDiscount: false,
    features: [
      {
        title: t(keys.freemium.info1),
        icon: Dashboard,
      },
      {
        title: t(keys.freemium.info2),
        icon: Dashboard,
      },
      {
        title: t(keys.freemium.info3),
        icon: Blockchain,
      },
      {
        title: t(keys.freemium.info4),
        icon: Briefcase,
      },
      {
        title: t(keys.freemium.info5),
        icon: ShieldUnsafe,
      },
      {
        title: t(keys.freemium.info6),
        icon: Question,
      },
    ],
    sale: t(keys.sale),
  };
};
