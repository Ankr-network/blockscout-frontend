export interface NavigationItem {
  label: string;
  href?: string;
  isDisabled?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
}
