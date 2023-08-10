import { FormValues, OnChange } from '../../types';

export interface PriceTabsProps {
  className?: string;
  initialTabID?: FormValues['priceId'];
  onChange: OnChange;
}
