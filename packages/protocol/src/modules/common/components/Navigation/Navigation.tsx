import { BaseNavButton } from './BaseNavButton';
import {
  NavigationItem,
  NavigationProps,
} from './BaseNavButton/BaseNavButtonTypes';

export const Navigation = ({ items, isMobileSiderBar }: NavigationProps) => {
  return (
    <nav>
      {items.map((item: NavigationItem) => (
        <BaseNavButton
          key={`button-${item.label}`}
          item={item}
          isMobileSiderBar={isMobileSiderBar}
        />
      ))}
    </nav>
  );
};
