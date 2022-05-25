import { Quantifier } from './types';
import { i18nKeyRoot } from '../../BalanceUtils';
import { t } from 'modules/i18n/utils/intl';

const root = `${i18nKeyRoot}.descriptions.quantifiers`;

const quantifiersMap: Record<Quantifier, string> = {
  [Quantifier.APPROXIMATELY]: t(`${root}.approximately`),
  [Quantifier.MORE]: t(`${root}.more`),
};

export const getQuantifier = (quantifier: Quantifier): string =>
  quantifiersMap[quantifier];
