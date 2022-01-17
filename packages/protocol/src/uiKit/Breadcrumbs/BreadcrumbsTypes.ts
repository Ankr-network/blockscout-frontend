export interface BreadcrumbItem {
  title: string;
  link?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
