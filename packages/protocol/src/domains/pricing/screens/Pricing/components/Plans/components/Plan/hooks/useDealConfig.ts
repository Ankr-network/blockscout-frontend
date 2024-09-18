import {
  Briefcase,
  Dashboard,
  Question,
  ShieldUnsafe,
  Sun,
} from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { plansTranslation } from '../../../plansTranslation';
import { ReactComponent as Blockchain } from '../../../assets/blockchain.svg';

export const useDealConfig = () => {
  const { keys, t, tHTML } = useTranslation(plansTranslation);

  return {
    title1: t(keys.deal.title),
    title2: t(keys.deal.subtitle),
    price: tHTML(keys.deal.price),
    label: t(keys.deal.label),
    isPremium: true,
    actionText: t(keys.deal.button),
    isDiscount: true,
    features: [
      {
        title: t(keys.deal.info1),
        icon: Dashboard,
      },
      {
        title: t(keys.deal.info2),
        icon: Dashboard,
      },
      {
        title: t(keys.deal.info3),
        icon: Blockchain,
      },
      {
        title: t(keys.deal.info4),
        icon: Sun,
      },
      {
        title: t(keys.deal.info5),
        icon: Briefcase,
      },
      {
        title: t(keys.deal.info6),
        icon: ShieldUnsafe,
      },
      {
        title: t(keys.deal.info7),
        icon: Question,
      },
    ],
    sale: t(keys.sale),
  };
};
