export interface RouteItem {
  path: string;
  generatePath: (...args: any) => string;
  useParams?: (...args: any) => any;
  breadcrumbs?: string | ((data: any) => void);
}

export function createRouteConfig<T>(
  config: {
    [K in keyof T]: T[K] extends RouteItem ? T[K] : never;
  },
  root: string,
) {
  return {
    ...config,
    root,
  };
}
