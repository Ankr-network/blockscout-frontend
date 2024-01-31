import { BreadcrumbItem } from 'uiKit/Breadcrumbs';

export interface IBreadcrumbsContext {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
}
