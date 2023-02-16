export interface BaseRoute {
  path: string;
  generatePath: (...args: unknown[]) => string;
  useParams?: (...args: unknown[]) => unknown;
  breadcrumbs?: string;
}

type TRouteConfig<T> = {
  [K in keyof T]: T[K] extends BaseRoute ? T[K] : T[K];
};

export function createRouteConfig<T>(
  config: TRouteConfig<T>,
  root: string,
): TRouteConfig<T> & { root: string } {
  return { ...config, root };
}
