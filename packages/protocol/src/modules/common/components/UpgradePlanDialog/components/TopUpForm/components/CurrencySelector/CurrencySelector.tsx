import { TabsManager, TabsManagerProps } from 'uiKit/TabsManager';

import { useCurrencySelectorStyles } from './CurrencySelectorStyles';

export const CurrencySelector = ({ className, ...props }: TabsManagerProps) => {
  const { classes, cx } = useCurrencySelectorStyles();

  return <TabsManager {...props} className={cx(classes.root, className)} />;
};
