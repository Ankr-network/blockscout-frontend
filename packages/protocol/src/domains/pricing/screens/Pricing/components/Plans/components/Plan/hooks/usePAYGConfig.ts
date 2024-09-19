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

export const usePAYGConfig = () => {
  const { keys, t, tHTML } = useTranslation(plansTranslation);

  return {
    title1: t(keys.payAsYouGo.title),
    title2: t(keys.payAsYouGo.subtitle),
    price: tHTML(keys.payAsYouGo.price),
    label: t(keys.payAsYouGo.label),
    isPremium: true,
    actionText: t(keys.payAsYouGo.button),
    isDiscount: false,
    features: [
      {
        title: t(keys.payAsYouGo.info1),
        icon: Dashboard,
      },
      {
        title: t(keys.payAsYouGo.info2),
        icon: Dashboard,
      },
      {
        title: t(keys.payAsYouGo.info3),
        icon: Blockchain,
      },
      {
        title: t(keys.payAsYouGo.info4),
        icon: Sun,
      },
      {
        title: t(keys.payAsYouGo.info5),
        icon: Briefcase,
      },
      {
        title: t(keys.payAsYouGo.info6),
        icon: ShieldUnsafe,
      },
      {
        title: t(keys.payAsYouGo.info7),
        icon: Question,
      },
    ],
    sale: t(keys.sale),
  };
};
