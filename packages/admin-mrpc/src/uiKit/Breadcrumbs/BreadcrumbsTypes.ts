export interface BreadcrumbItem {
  title: string;
  link?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
