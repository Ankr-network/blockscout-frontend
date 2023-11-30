import {
  BaseNavButton,
  NavigationItem,
  NavigationProps,
} from './BaseNavButton';

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
