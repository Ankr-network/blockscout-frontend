import { Currency } from 'domains/account/types';
import { useSwitcher } from 'modules/common/hooks/useSwitcher';

const { ANKR, CREDIT } = Currency;

const items: Currency[] = [ANKR, CREDIT];

export const useCurrency = () => useSwitcher({ items });
