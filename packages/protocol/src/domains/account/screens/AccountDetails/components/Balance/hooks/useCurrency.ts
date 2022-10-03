import { Currency } from 'domains/account/types';
import { useSwitcher } from 'modules/common/hooks/useSwitcher';

const { CREDIT } = Currency;

const items: Currency[] = [CREDIT];

export const useCurrency = () => useSwitcher({ items });
