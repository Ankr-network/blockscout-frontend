import { Quantifier } from './types';
import { root as i18nKeyRoot } from '../../../const';
import { t } from '@ankr.com/common';

const root = `${i18nKeyRoot}.descriptions.quantifiers`;

const quantifiersMap: Record<Quantifier, string> = {
  [Quantifier.APPROXIMATELY]: t(`${root}.approximately`),
  [Quantifier.MORE]: t(`${root}.more`),
};

export const getQuantifier = (quantifier: Quantifier): string =>
  quantifiersMap[quantifier];
