import {
  BaseNavButton,
  NavigationItem,
  NavigationProps,
} from './BaseNavButton';

export const Navigation = ({ items, isMobileSideBar }: NavigationProps) => {
  return (
    <nav>
      {items.map((item: NavigationItem) => (
        <BaseNavButton
          key={`button-${item.label}`}
          item={item}
          isMobileSideBar={isMobileSideBar}
        />
      ))}
    </nav>
  );
};
